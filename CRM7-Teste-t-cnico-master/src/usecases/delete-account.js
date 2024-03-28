import { RepositoryAccount } from '../infrastructure/db/repository/repository-accounts.js';

export class DeleteAccount {
  async execute(id) {
    // Verificar se a conta existe
    const existingAccount = await new RepositoryAccount().fetch(id);
    if (!existingAccount) {
      throw new Error('Conta não encontrada');
    }

    // Excluir a conta do banco de dados
    await existingAccount.deleteOne();

    // Retorna uma mensagem de sucesso, já que o status 204 significa "No Content"
    return 'Conta excluída com sucesso';
  }
}