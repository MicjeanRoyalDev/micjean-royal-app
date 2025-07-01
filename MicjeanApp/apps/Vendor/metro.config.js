const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../../..');
const micjeanAppRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(__dirname);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

config.resolver.alias = {
  '@': micjeanAppRoot,
};

module.exports = withNativeWind(config, { input: './global.css' });
