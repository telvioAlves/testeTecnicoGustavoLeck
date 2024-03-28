import {RepositoryAccount} from '../infrastructure/db/repository/repository-accounts.js';

export class ConsultAllAccounts {
  async execute() {
    const response = await new RepositoryAccount().findAll();
    return response;
  }
}
