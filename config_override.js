module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "http": false,
    "https": false,
    "zlib": false,
    "stream": false,
    "url": false,
    "assert": false,
    "util": false,
    "crypto": false,
    "http2": false
  };
  return config;
};