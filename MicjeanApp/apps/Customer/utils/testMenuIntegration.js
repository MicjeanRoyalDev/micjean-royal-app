// Test file to verify menu integration
import { menu } from '../backend/supabase/menu';

// Test function to verify menu functions
export const testMenuIntegration = async () => {
  console.log('Testing menu integration...');
  
  try {
    // Test 1: Get all categories
    console.log('Testing getAllCategories...');
    const categoriesResult = await menu.getAllCategories();
    console.log('Categories result:', categoriesResult);
    
    if (categoriesResult.data && categoriesResult.data.length > 0) {
      const firstCategoryId = categoriesResult.data[0].id;
      
      // Test 2: Get menu items by category
      console.log(`Testing getMenuItemsByCategory for category ${firstCategoryId}...`);
      const menuItemsResult = await menu.getMenuItemsByCategory(firstCategoryId);
      console.log('Menu items result:', menuItemsResult);
      
      if (menuItemsResult.data && menuItemsResult.data.length > 0) {
        const firstMenuId = menuItemsResult.data[0].id;
        
        // Test 3: Get menu item by ID (with addons)
        console.log(`Testing getMenuById for menu item ${firstMenuId}...`);
        const menuItemResult = await menu.getMenuById(firstMenuId);
        console.log('Menu item with addons result:', menuItemResult);
      }
    }
    
    // Test 4: Get full menu
    console.log('Testing getFullMenu...');
    const fullMenuResult = await menu.getFullMenu();
    console.log('Full menu result:', fullMenuResult);
    
    console.log('Menu integration test completed successfully!');
  } catch (error) {
    console.error('Menu integration test failed:', error);
  }
};

// Example usage:
// testMenuIntegration();
