import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  nome: {
    type: String,
  },
  cnpj: {
    type: String,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  }
});

export const AccountSchema = new mongoose.model(
  "accounts",
  accountSchema
);
