import { CreateAccount } from "../usecases/create-account.js";

export class CreateAccountController {
  async handle(req, res) {
    const { nome, cnpj } = req.body;
    const response = await new CreateAccount().execute(nome, cnpj);
    return res.status(201).send(response);
  }
}