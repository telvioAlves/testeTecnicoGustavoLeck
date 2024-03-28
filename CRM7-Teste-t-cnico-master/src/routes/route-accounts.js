// import express from "express";
// import { ConsultAllAccountsController } from "../controllers/consult-all-accounts-controller.js";

// const router = express.Router();

// router.get("/accounts", new ConsultAllAccountsController().handle);

// export default router;

import express from "express";
import { ConsultAllAccountsController } from "../controllers/consult-all-accounts-controller.js";
import { ConsultAccountController } from "../controllers/consult-account-controller.js";
import { CreateAccountController } from "../controllers/create-account-controller.js";
import { UpdateAccountController } from "../controllers/update-account-controller.js";
import { DeleteAccountController } from "../controllers/delete-account-controller.js";

const router = express.Router();

// Consulta todas as contas
router.get("/accounts", new ConsultAllAccountsController().handle);

// Consulta uma única conta
router.get("/accounts/:id", new ConsultAccountController().handle);

// Cria uma nova conta
router.post("/accounts", new CreateAccountController().handle);

// Atualiza uma conta existente
router.put("/accounts/:id", new UpdateAccountController().handle);

// Exclui uma conta existente
router.delete("/accounts/:id", new DeleteAccountController().handle);

export default router;