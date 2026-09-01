// Test stub for the ESM-only `query-string` package.
// lib/utils.ts imports it at module load, but none of the functions we unit-test
// (round2, formatCurrency, formatError, calcPrice) ever call it, so a no-op stub
// lets ts-jest load the module under CommonJS without pulling in ESM node_modules.
export const parse = () => ({});
export const stringify = () => "";
const queryStringStub = { parse, stringify };
export default queryStringStub;
