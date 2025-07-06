import { supabase } from "./clients";

export const menu = {
  /**
   * Get menu items by category
   * @param {number} categoryId - The ID of the category to filter by
   * @returns {Promise<{data: Array, error: string|null}>}
   */
  getMenuItemsByCategory: async (categoryId) => {
    // convert categoryId to number if it's a string
    if (typeof categoryId === "string") {
      categoryId = parseInt(categoryId, 10);
    }
    try {
      const { data, error } = await supabase
        .from("menu")
        .select(
          `
          id,
          name,
          price,
          image_url,
          is_available,
          category:category_id(id, name)
        `
        )
        .eq("category_id", categoryId)
        .eq("is_available", true)
        .order("name", { ascending: true });

      if (error) throw error;

      return {
        data: data || [],
        error: null,
      };
    } catch (error) {
      console.error("Error fetching menu items by category:", error);
      return {
        data: [],
        error: error.message,
      };
    }
  },

  /**
   * Get all menu items grouped by category
   * @returns {Promise<{data: Array, error: string|null}>}
   */
  getFullMenu: async () => {
    try {
      const { data: categories, error: catError } = await supabase
        .from("categories")
        .select("id, name")
        .order("display_order");

      if (catError) throw catError;
      const { data: menuItems, error: menuError } = await supabase
        .from("menu")
        .select(
          `
          id,
          name,
          price,
          image_url,
          category_id,
          is_available
        `
        )
        .eq("is_available", true);

      const menuItemsByCategory = menuItems.reduce((acc, item) => {
        if (!acc[item.category_id]) {
          acc[item.category_id] = [];
        }
        acc[item.category_id].push(item);
        return acc;
      }, {});

      const menuByCategory = categories.map((category) => ({
        ...category,
        items: menuItemsByCategory[category.id] || [],
      }));

      return {
        data: menuByCategory,
        error: menuError ? menuError.message : null,
      };
    } catch (error) {
      console.error("Error fetching full menu:", error);
      return {
        data: [],
        error: error.message,
      };
    }
  },

  /**
   * Get all categories
   * @returns {Promise<{data: Array, error: string|null}>}
   */
  getAllCategories: async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("display_order");

      return {
        data: data || [],
        error: error ? error.message : null,
      };
    } catch (error) {
      console.error("Error fetching all categories:", error);
      return {
        data: [],
        error: error.message,
      };
    }
  },

  /**
   * Get a single menu item by ID
   * @param {number} itemId - The ID of the menu item
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  getMenuById: async (menuId) => {
    // Convert menuId to number if it's a string
    if (typeof menuId === "string") {
      menuId = parseInt(menuId, 10);
    }
    try {
      const { data, error } = await supabase
        .from("menu")
        .select(
          `
          *,
          menu_item_addons(
            addon:addons(id, name, price)
          )
          `
        )
        .eq("id", menuId)
        .single();

      if (data) {
        const menuItem = {
          ...data,
          addons: data.menu_item_addons
            ? data.menu_item_addons.map((mia) => mia.addon)
            : [],
        };
        delete menuItem.menu_item_addons;
        return {
          data: menuItem,
          error: null,
        };
      }

      return {
        data: null,
        error: error || null,
      };
    } catch (error) {
      console.error("Error fetching menu item by ID:", error);
      return {
        data: null,
        error: error.message,
      };
    }
  },
};
