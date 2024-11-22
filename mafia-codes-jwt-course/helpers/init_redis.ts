import { createClient } from "redis";

const client = createClient();

client.on("connect", () => console.log("Redis client connected."));
client.on("ready", () => console.log("Redis client is ready to use."));
client.on("error", (err) => console.error("Redis client error:", err));
client.on("end", () => console.log("Redis client disconnected."));

process.on("SIGINT", async () => {
  await client.quit();
  console.log("Redis client closed on app termination.");
  process.exit(0);
});

export default client;
