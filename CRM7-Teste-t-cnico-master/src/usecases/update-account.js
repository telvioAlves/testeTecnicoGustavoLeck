import { RepositoryAccount } from '../infrastructure/db/repository/repository-accounts.js';

export class UpdateAccount {
  async execute(id, nome, cnpj) {
    // Verificar se a conta existe
    const existingAccount = await new RepositoryAccount().fetch(id);
    if (!existingAccount) {
      throw new Error('Conta não encontrada');
    }

    // Atualizar os dados da conta
    existingAccount.nome = nome;
    existingAccount.cnpj = cnpj;

    // Salvar a conta atualizada no banco de dados
    const updatedAccount = await existingAccount.save();

    return updatedAccount;
  }
}