import { RepositoryAccount } from '../infrastructure/db/repository/repository-accounts.js';

export class ConsultAccount {
  async execute(id) {
    // Consultar a conta no banco de dados
    const account = await new RepositoryAccount().fetch(id);
    
    // Verificar se a conta existe
    if (!account) {
      throw new Error('Conta não encontrada');
    }

    return account;
  }
}