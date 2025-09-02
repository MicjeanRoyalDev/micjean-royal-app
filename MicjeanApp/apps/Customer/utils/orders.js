import { supabase } from "./clients";
import { auth } from "./auth";
export const orders = {
  /**
   * @param {Object} order - The order object containing the following properties:
   * @param {number} order.userId - The ID of the user creating the order.
   * @param {number} order.menuId - The ID of the menu item being ordered.
   * @param {Array} order.addons - List of addons for the order.
   * @param {number} order.locationId - The ID of the location for the order.
   * @param {number} order.total - The total price of the order.
   * @param {number} order.quantity - The quantity of the menu item ordered.
   * @param {string} order.instructions - Special instructions for the order.
   * @param {number} order.packageId - The ID of the package for the order.
   * @returns {Promise<{data: string, error: string | null}  >} - The created order object or an error message
   * @example
   * const {data:profile, error} = await auth.getProfile();
   * const userId = profile?.sub;
   *
   */
  createOrder: async (order) => {
    const {
      userId,
      menuId,
      addons,
      locationId,
      total,
      quantity,
      instructions,
      packageId,
    } = order;

    try {
      // 1. Create the order first
      const { data, error: orderError } = await supabase.rpc(
        "create_complete_order",
        {
          p_user_id: userId,
          p_menu_id: menuId,
          p_location_id: locationId,
          p_total: total,
          p_quantity: quantity,
          p_addons:
            addons?.map((a) => ({
              id: a.id,
              quantity: a.quantity,
            })) ?? [],
          p_instructions: instructions,
          p_package_id: packageId,
        }
      );

      if (orderError)
        throw new Error(`Order creation failed: ${orderError.message}`);
      return {
        success: true,
        message: "Order created successfully",
      };
    } catch (error) {
      console.error("Order processing failed:", error.message);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  /**
   * Cancel a user's order
   * @param {number} orderId - The ID of the order
   * @returns {Promise<{data: Array, error: string|null}>}
   */
  cancelOrder: async (orderId) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", orderId);

      return {
        success: !error,
        error: error
          ? "Failed to cancel order: " + error.message
          : "Order has successfully been cancelled",
        data,
      };
    } catch (err) {
      return {
        success: false,
        error: "An unexpected error occurred while cancelling the order",
        data: null,
      };
    }
  },

  /**
   * Get all orders for a user
   * @param {string} userId - The ID of the user
   * @returns {Promise<{data: Array, error: string|null}>}
   */
  getUserOrders: async (userId) => {
    // Get the last five orders for the user, any status, most recent first
    const { profile: user, error: authError } = await auth.getProfile();
    if (authError || !user || user.sub !== userId) {
      throw new Error("Authentication failed");
    }
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
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
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

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
