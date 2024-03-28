import { RepositoryAccount } from '../infrastructure/db/repository/repository-accounts.js';

export class CreateAccount {
  async execute(nome, cnpj) {
    // Validações podem ser feitas aqui, se necessário

    // Criar nova conta no banco de dados
    const newAccount = {
      nome: nome,
      cnpj: cnpj
    };
    const createdAccount = await new RepositoryAccount().create(newAccount);
    
    return createdAccount;
  }
}