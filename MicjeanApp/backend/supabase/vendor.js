import { supabase } from "./clients";

// --- Internal Helper Functions ---

/**
 * Maps the database boolean `is_available` to the frontend's MenuStatus type.
 * Note: The schema cannot differentiate "Sold Out" from "Hidden".
 * We'll simplify to "Available" vs. "Unavailable" for data accuracy.
 * @param {boolean} is_available - The value from the database.
 * @returns {'Available' | 'Unavailable'}
 */
const toMenuStatus = (is_available) =>
  is_available ? "Available" : "Unavailable";

/**
 * Maps the frontend's MenuStatus type back to the database boolean `is_available`.
 * @param {'Available' | 'Unavailable'} status - The status from the frontend.
 * @returns {boolean}
 */
const fromMenuStatus = (status) => status === "Available";

// --- Main API Object ---

export const vendorApi = {
  // --- Menu and Category Management ---

  /**
   * Fetches all categories.
   * @returns {Promise<{data: Array, error: string|null}>}
   */
  getCategories: async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("display_order");

      if (error) throw error;

      // Convert integer IDs to strings for frontend consistency
      const shapedData = data.map((c) => ({ ...c, id: c.id.toString() }));

      return { data: shapedData || [], error: null };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { data: [], error: error.message };
    }
  },

  getMenuItems: async ({ categoryId } = {}) => {
    try {
      let query = supabase
        .from("menu")
        .select(`id, name, image_url, category_id, price, is_available`)
        .order("name", { ascending: true });

      // If a categoryId is provided, add a filter to the query
      if (categoryId) {
        query = query.eq("category_id", parseInt(categoryId, 10));
      }

      const { data, error } = await query;

      if (error) throw error;

      const shapedData = data.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        imageUrl: item.image_url,
        categoryId: item.category_id.toString(),
        price: item.price,
        status: toMenuStatus(item.is_available),
        description: "", // Return empty string as requested
      }));

      return { data: shapedData || [], error: null };
    } catch (error) {
      console.error("Error fetching vendor menu items:", error);
      return { data: [], error: error.message };
    }
  },

  /**
   * Updates a specific menu item.
   * @param {string} menuId - The ID of the menu item to update.
   * @param {object} updates - An object containing the fields to update (e.g., name, price, status).
   * @returns {Promise<{data: object, error: string|null}>}
   */
  updateMenuItem: async (menuId, updates) => {
    try {
      const dbUpdates = { ...updates };

      // Convert frontend types to database types
      if (dbUpdates.status) {
        dbUpdates.is_available = fromMenuStatus(dbUpdates.status);
        delete dbUpdates.status;
      }
      if (dbUpdates.categoryId) {
        dbUpdates.category_id = parseInt(dbUpdates.categoryId, 10);
        delete dbUpdates.categoryId;
      }
      if (dbUpdates.imageUrl) {
        dbUpdates.image_url = dbUpdates.imageUrl;
        delete dbUpdates.imageUrl;
      }

      const { data, error } = await supabase
        .from("menu")
        .update(dbUpdates)
        .eq("id", parseInt(menuId, 10))
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error updating menu item:", error);
      return { data: null, error: error.message };
    }
  },

  /**
   * Creates a new menu item in the database.
   * @param {object} newMenuItem - The data for the new menu item.
   * @returns {Promise<{data: object, error: string|null}>} The newly created menu item.
   */
  createMenuItem: async (newMenuItem) => {
    try {
      const { name, categoryId, price, imageUrl, status } = newMenuItem;

      // Map frontend data to the database schema
      const newItemForDb = {
        name,
        category_id: parseInt(categoryId, 10),
        price: price || 0,
        image_url: imageUrl || "https://default-image-url.com/placeholder.png", // Provide a default
        is_available: fromMenuStatus(status),
      };

      const { data, error } = await supabase
        .from("menu")
        .insert([newItemForDb])
        .select() // Use select() to return the newly created row
        .single(); // Ensure we get a single object back, not an array

      if (error) throw error;

      // Shape the returned data to match the frontend 'Menu' type
      const shapedData = {
        id: data.id.toString(),
        name: data.name,
        imageUrl: data.image_url,
        categoryId: data.category_id.toString(),
        price: data.price,
        status: toMenuStatus(data.is_available),
        description: "", // As per our rule
      };

      return { data: shapedData, error: null };
    } catch (error) {
      console.error("Error creating menu item:", error);
      return { data: null, error: error.message };
    }
  },

  // --- Order Management ---

  /**
   * Fetches a paginated list of all orders, with filtering capabilities.
   * @param {object} params - Parameters for filtering and pagination.
   * @returns {Promise<{data: {items: Array, total: number, page: number, limit: number}, error: string|null}>}
   */
  getOrders: async ({ status, page = 1, limit = 10 }) => {
    try {
      let query = supabase
        .from("orders")
        .select(
          `
          id,
          order_number,
          total_amount,
          created_at,
          status,
          user:user_profiles( * ),
          order_items(
            menu:menuid( name ),
            addons:order_item_addons( addon:addons( name ) )
          )
        `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false });

      // Apply status filter
      if (status && status !== "active") {
        query = query.eq("status", status);
      } else if (status === "active") {
        query = query.in("status", ["placed", "preparing", "ready"]);
      }

      // Apply pagination
      const startIndex = (page - 1) * limit;
      query = query.range(startIndex, startIndex + limit - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      const shapedData = data.map((order) => ({
        id: order.order_number,
        internalId: order.id, // Keep the real ID for update operations
        customerName: order.user?.raw_user_meta_data?.name || "Guest Customer",
        status: order.status,
        items: order.order_items.map((item) => ({
          food: item.menu.name,
          toppings: item.addons.map((a) => a.addon.name),
        })),
        totalAmount: order.total_amount,
        createdAt: order.created_at,
      }));

      return {
        data: { items: shapedData, total: count || 0, page, limit },
        error: null,
      };
    } catch (error) {
      console.error("Error fetching all orders for vendor:", error);
      return { data: null, error: error.message };
    }
  },

  getOrderById: async (orderNumber) => {
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .select(
          `
          id,
          order_number,
          total_amount,
          created_at,
          status,
          user:user_id( raw_user_meta_data ),
          order_items(
            menu:menuid( name ),
            addons:order_item_addons( addon:addons( name ) )
          )
        `
        )
        .eq("order_number", orderNumber)
        .single(); // .single() is key here to get one object instead of an array

      if (error) throw error;

      // Handle the case where the order isn't found
      if (!order) {
        return { data: null, error: "Order not found" };
      }

      // Shape the data to match the frontend OrderListItem type
      const shapedData = {
        id: order.order_number,
        internalId: order.id,
        customerName: order.user?.raw_user_meta_data?.name || "Guest Customer",
        status: order.status,
        items: order.order_items.map((item) => ({
          food: item.menu.name,
          toppings: item.addons.map((a) => a.addon.name),
        })),
        totalAmount: order.total_amount,
        createdAt: order.created_at,
      };

      return { data: shapedData, error: null };
    } catch (error) {
      console.error(`Error fetching order by ID (${orderNumber}):`, error);
      return { data: null, error: error.message };
    }
  },

  /**
   * Updates the status of a specific order using its internal integer ID.
   * @param {number} orderId - The integer `id` of the order to update.
   * @param {string} newStatus - The new status to set.
   * @returns {Promise<{success: boolean, error: string|null}>}
   */
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", orderId);

      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error("Error updating order status:", error);
      return { success: false, error: error.message };
    }
  },
};
