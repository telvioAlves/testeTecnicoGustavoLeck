import { ConsultAccount } from '../usecases/consult-account.js';

export class ConsultAccountController {
  async handle(req, res) {
    const { id } = req.params;

    try {
      const account = await new ConsultAccount().execute(id);
      return res.status(200).send(account);
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
  }
}