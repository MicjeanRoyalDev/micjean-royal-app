// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");
// const path = require('path');

// const config = getDefaultConfig(__dirname);

// config.resolver.alias = {
//   "@": path.resolve(__dirname, "../.."),
// };

// module.exports = withNativeWind(config, { input: "./global.css" });

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require('path');

// Establish the project and workspace root directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

// Start with the default Expo Metro configuration
const config = getDefaultConfig(projectRoot);

// 1. Add the workspace root and the specific 'backend' folder to Metro's watch list
// This allows Metro to see files outside of the `apps/Vendor` directory.
config.watchFolders = [
    workspaceRoot,
    path.resolve(workspaceRoot, 'backend') 
];

// 2. Configure the resolver to look for modules in the workspace root's node_modules.
// This is crucial for resolving shared dependencies in a monorepo.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. (Optional but recommended) Alias your backend for cleaner imports
// This lets you use `import { vendorApi } from '@backend/supabase/vendor';`
// which is less fragile than `../../../`.
config.resolver.alias = {
  "@backend": path.resolve(workspaceRoot, 'backend'),
};

// Finally, wrap the modified config with the NativeWind plugin
module.exports = withNativeWind(config, { input: "./global.css" });