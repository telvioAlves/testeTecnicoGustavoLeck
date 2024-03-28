import { config } from "dotenv";
import mongoose from "mongoose";
config();

const mongoDomain = process.env.mongoDB;
let isConnected = false;

export async function mongoSetup() {
  try {
    await mongoose.connect(mongoDomain);
    await mongoose.set("strictQuery", false);
    isConnected = true;
    console.log("\nMongoDB Conectado com Sucesso");
  } catch (error) {
    console.log("\nErro ao Conectar ao MongoDB: ", error);
    isConnected = false;
  }
}

export function isMongoConnected() {
  return isConnected;
}
