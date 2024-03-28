import { UpdateAccount } from "../usecases/update-account.js";

export class UpdateAccountController {
  async handle(req, res) {
    const { id } = req.params;
    const { nome, cnpj } = req.body;
    const response = await new UpdateAccount().execute(id, nome, cnpj);
    return res.status(200).send(response);
  }
}