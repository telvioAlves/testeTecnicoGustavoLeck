import { ConsultAllAccounts } from "../usecases/consult-all-accounts.js";

export class ConsultAllAccountsController {
  async handle(req, res) {
    const response = await new ConsultAllAccounts().execute();
    return res.status(200).send(response);
  }
}
