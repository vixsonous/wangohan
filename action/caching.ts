import NodeCache from "node-cache";

export const highDynamicData = new NodeCache({stdTTL: 300});
export const lowDynamicData = new NodeCache({stdTTL: 86400});
