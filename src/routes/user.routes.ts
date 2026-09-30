import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema } from "../schemas/user.schema";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();

// Injeção de dependências manual
const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Aplica autenticação em todas as rotas de usuários
userRouter.use(authMiddleware);

userRouter.post("/", validate(createUserSchema), userController.create);
userRouter.get("/", userController.getAll);

export { userRouter };
