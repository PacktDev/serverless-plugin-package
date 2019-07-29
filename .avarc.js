export default {
  files: ['**/*.spec.ts'],
  compileEnhancements: false,
  extensions: [
    "ts",
  ],
  require: [
    "ts-node/register",
  ],
  snapshotDir: "snapshots"
};
