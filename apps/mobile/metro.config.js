const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add the shared package to watchFolders so Metro can find it
config.watchFolders = [path.resolve(__dirname, '../../packages/shared')];

// Configure resolver to handle the shared package
config.resolver.alias = {
  '@poropara/shared': path.resolve(__dirname, '../../packages/shared'),
};

// Ensure Metro can resolve TypeScript files
config.resolver.sourceExts.push('ts', 'tsx');

module.exports = config;
