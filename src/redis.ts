import Redis from "ioredis";

export const redis = new Redis({maxRetriesPerRequest:100});
