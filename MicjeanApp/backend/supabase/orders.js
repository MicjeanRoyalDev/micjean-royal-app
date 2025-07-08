import { supabase } from "./clients";
import { auth } from "./auth";
export const orders = {
  /**
   * Create a new order
   * @param {Object} order - The order object containing details like userId, productId, quantity, etc.
   * @returns {Promise<{data: string, error: string | null}  >} - The created order object or an error message
   * @example
   * const {data:profile, error} = await auth.getProfile();
   * const userId = profile?.sub;
   *
   */
  createOrder: async (
    userId,
    menuId,
    addons,
    locationId,
    total,
    quantity,
    instructions,
    packageId
  ) => {
    try {
      const { profile: user, error: authError } = await auth.getProfile();
      if (authError || !user || user.sub !== userId) {
        throw new Error("Authentication failed");
      }
      const addonsData = addons?.map((addon) => ({
        id: addon.id,
        quantity: addon.quantity,
        price: addon.price,
      }));
      const { data, error } = await supabase.rpc("create_complete_order", {
        p_user_id: userId,
        p_menu_id: menuId,
        p_location_id: locationId,
        p_total: total,
        p_quantity: quantity,
        p_addons: addonsData,
        p_instructions: instructions,
        p_package_id: packageId,
      });

      if (error) throw error;

      return {
        success: true,
        message: "Order created successfully with addons",
      };
    } catch (error) {
      console.error("Order creation failed:", error);
      return {
        data: null,
        error: error.message,
      };
    }
  },

  /**
   * Get all orders for a user
   * @param {string} userId - The ID of the user
   * @returns {Promise<{data: Array, error: string|null}>}
   */
  getUserOrders: async (userId) => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        order_number,
        user_id,
        created_at,
        total_amount,
        status,
        quantity,
        order_items:order_items(
          menu:menuid(
            image_url,
            name
          )
        )
      `
      )
      .eq("status", "delivered")
      .eq("user_id", userId);

    return {
      data: data || [],
      error: error ? error.message : null,
    };
  },

  getLocations: async () => {
    try {
      const { data, error } = await supabase
        .from("locations")
        .select(`*`)
        .order("name");
      if (error) {
        throw new Error(error.message);
      }

      return {
        data: data || [],
        error: null,
      };
    } catch (error) {
      console.error("Error fetching locations:", error);
      return {
        data: [],
        error: error.message,
      };
    }
  },

  getPackages: async () => {
    try {
      const { data, error } = await supabase
        .from("package")
        .select(`*`)
        .order("price", { ascending: true });
      if (error) {
        throw new Error(error.message);
      }

      return {
        data: data || [],
        error: null,
      };
    } catch (error) {
      console.error("Error fetching packages:", error);
      return {
        data: [],
        error: error.message,
      };
    }
  },
  getCart: async (userId) => {
    const { profile: user, error: authError } = await auth.getProfile();
    if (authError || !user || user.sub !== userId) {
      throw new Error("Authentication failed");
    }
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        order_number,
        user_id,
        created_at,
        status,
        total_amount,
        quantity,
        order_items:order_items(
          menu:menuid(
            image_url,
            name
          ),
          quantity
        )
      `
      )
      .eq("status", "pending")
      .eq("user_id", userId);

    return {
      data: data || [],
      error: error ? error.message : null,
    };
  },
};
