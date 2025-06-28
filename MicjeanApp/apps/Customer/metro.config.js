const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

module.exports = {
    ...getDefaultConfig(projectRoot),
    watchFolders: [
        path.resolve(workspaceRoot, 'shared'), // Adjust 'shared' to your shared folder name
        workspaceRoot,
    ],
    resolver: {
        ...getDefaultConfig(projectRoot).resolver,
        nodeModulesPaths: [
            path.resolve(projectRoot, 'node_modules'),
            path.resolve(workspaceRoot, 'node_modules'),
        ],
        // Optionally add extraNodeModules if you need to alias packages
    },
};