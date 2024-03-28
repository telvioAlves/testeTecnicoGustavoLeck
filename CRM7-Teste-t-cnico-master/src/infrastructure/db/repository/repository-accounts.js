import mongoose from "mongoose";
import { AccountSchema } from "../schema/schema-accounts.js";

export class RepositoryAccount {
    async create(data) {
        return await AccountSchema.create(data);
    }

    async delete(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }
        return await AccountSchema.deleteOne({ _id: id });
    }

    async fetch(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }
        return await AccountSchema.findOne({ _id: id });
    }

    async findAll() {
        return await AccountSchema.find();
    }
}