import { DeleteAccount } from "../usecases/delete-account.js";

export class DeleteAccountController {
  async handle(req, res) {
    const { id } = req.params;
    await new DeleteAccount().execute(id);
    return res.status(204).send();
  }
}