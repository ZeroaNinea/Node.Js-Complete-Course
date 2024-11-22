import { createClient } from "redis";

export const client = createClient();

client.on("connect", () => {
  console.log("Client, connected to redis...");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use...");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from redis.");
});

process.on("SIGINT", () => {
  client.quit();
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();
