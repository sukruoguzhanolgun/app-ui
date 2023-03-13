export function init():void {
  loadFeaturePackages();
}
function loadFeaturePackages():void {
  const files = require.context("@", true, /^.\/((?!\/).)+\/index\.(js|ts)$/);
  files.keys().forEach((file) => {
    files(file);
  });
}
