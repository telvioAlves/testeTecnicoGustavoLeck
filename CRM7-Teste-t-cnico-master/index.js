import express from "express";
import cors from "cors";
import { mongoSetup, isMongoConnected } from "./src/config/mongo-config.js";
import Accounts from "./src/routes/route-accounts.js";
import readline from "readline";
import { RepositoryAccount } from './src/infrastructure/db/repository/repository-accounts.js';
import mongoose from "mongoose";

const server = express();
let rodando = true;

server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const port = 5000;

server.listen(port, async () => {
  console.log(`\nServer is running`);
  
  // Init database connection
  await mongoSetup();
  
  // Wait for MongoDB connection before setting up routes
  if (isMongoConnected()) {
    server.use(`/api`, Accounts);
  } else {
    console.log("\nErro ao Conectar ao MongoDB. Encerrando aplicação.");
    process.exit(1);
  }

  // Interface para interagir com o usuário
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Função para exibir o prompt e esperar pela resposta
  async function askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  function showMainMenu() {
    console.log("\nMenu Principal:");
    console.log("1 - Consultar todas as contas");
    console.log("2 - Consultar uma conta específica");
    console.log("3 - Criar uma nova conta");
    console.log("4 - Atualizar uma conta existente");
    console.log("5 - Excluir uma conta");
    console.log("\nVocê pode encerrar o programa a qualquer momento utilizando o atalho 'Ctrl + C'\n")
  }

  while (rodando) {

    showMainMenu();
    const answer = await askQuestion("Digite sua escolha: \n");

  switch (answer.trim()) {
    case '1':
      console.log('\nConsultando todas as contas...');
    try {
    // Cria uma instância do RepositoryAccount
    const repositoryAccount = new RepositoryAccount();
    // Chama o método findAll para recuperar todas as contas
    const allAccounts = await repositoryAccount.findAll();
    // Exibe as contas no console
    console.log('\nContas encontradas:\n');
    allAccounts.forEach(account => {
      console.log(`ID: ${account._id}\nNome: ${account.nome}\nCNPJ: ${account.cnpj}\nData de Criação: ${account.dataCriacao}\n\n`);
    });
  } catch (error) {
    console.error('Erro ao consultar as contas:', error);
  }

      break;
      case '2':
        try {
          // Solicita o ID da conta que o usuário deseja consultar
          const accountIdToFind = await askQuestion("Digite o ID da conta que deseja consultar: ");
          const repositoryAccount = new RepositoryAccount();
          // Verifica se o ID fornecido é um ObjectId válido
          if (!mongoose.Types.ObjectId.isValid(accountIdToFind)) {
            throw new Error("ID inválido");
          }
          
          // Encontra a conta com base no ID fornecido
          const account = await repositoryAccount.fetch(accountIdToFind.trim());
      
          // Verifica se a conta foi encontrada
          if (!account) {
            console.log("\nConta não encontrada\n");
          } else {
            console.log("\nConta encontrada:\n\n", account);
          }
        } catch (error) {
          // Em caso de erro, exibe a mensagem de erro correspondente
          console.error('Erro ao consultar a conta:', error.message);
        }

        break;
      
    case '3':
      try {
        //console.log('Digite o nome e o CNPJ da nova conta (formato: nome,cnpj):');
        const newAccountData = await askQuestion("Digite o nome e o CNPJ da nova conta (formato: nome,cnpj): ");
        const [nome, cnpj] = newAccountData.trim().split(',');

        // Cria uma instância do RepositoryAccount
        const repositoryAccount = new RepositoryAccount();
        // Chama o método create para criar uma nova conta
        const newAccount = await repositoryAccount.create({ nome, cnpj });
        // Exibe uma mensagem de sucesso
        console.log(`Conta criada com sucesso. ID da nova conta: ${newAccount._id}`);
      } catch (error) {
        console.error('Erro ao criar a conta:', error.message);
      }

      break;
    case '4':
      try {
        const accountId = await askQuestion("Digite o ID da conta que deseja atualizar: ");
        const repositoryAccount = new RepositoryAccount();

        // Recupera a conta existente com base no ID
        const existingAccount = await repositoryAccount.fetch(accountId.trim());
    
        if (!existingAccount) {
          throw new Error("Conta não encontrada.");
        }
    
        const updateData = await askQuestion("Digite o novo nome e CNPJ da conta (formato: nome,cnpj): ");
        const [newNome, newCnpj] = updateData.trim().split(',');
    
        // Atualiza os campos da conta existente com os novos valores
        existingAccount.nome = newNome;
        existingAccount.cnpj = newCnpj;
    
        // Salva as alterações no banco de dados
        await existingAccount.save();
    
        // Exibe uma mensagem de sucesso
        console.log(`Conta atualizada com sucesso.`);
      } catch (error) {
        console.error('Erro ao atualizar a conta:', error.message);
      }

      break;
      case '5':
        try {
          // Solicita o ID da conta que o usuário deseja excluir
          const accountIdToDelete = await askQuestion("Digite o ID da conta que deseja excluir: ");
          const repositoryAccount = new RepositoryAccount();
          // Remove a conta com base no ID fornecido
          const resultMessage = await repositoryAccount.delete(accountIdToDelete.trim());
      
          // Exibe uma mensagem de sucesso
          console.log("\nConta excluída com sucesso\n");
        } catch (error) {
          // Em caso de erro, exibe a mensagem de erro correspondente
          console.error('Erro ao excluir a conta:', error.message);
        }

        break;      
    default:
      console.log('Ação inválida. Por favor, digite um número válido.');
  }

  const continueOption = await askQuestion("Deseja realizar outra operação? (S/N): ");
  if (continueOption.trim().toUpperCase() !== 'S') {
    console.log("Encerrando o programa...");
    rodando = false;
    process.exit();
  }

}

  // Fecha a interface readline
  rl.close();
});
