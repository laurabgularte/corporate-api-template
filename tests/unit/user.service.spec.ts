import { UserService } from "../../src/services/user.service";
import { InMemoryUserRepository } from "../../src/repositories/in-memory-user.repository";
import { ConflictError } from "../../src/errors/app-error";

describe("UserService Unit Tests", () => {
  let userRepository: InMemoryUserRepository;
  let userService: UserService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    userService = new UserService(userRepository);
  });

  it("deve criar um novo usuário com sucesso", async () => {
    const payload = {
      name: "Dev Senior",
      email: "senior@empresa.com",
      role: "ADMIN" as const,
    };
    const user = await userService.createUser(payload);

    expect(user).toHaveProperty("id");
    expect(user.email).toBe(payload.email);
  });

  it("não deve permitir cadastro de e-mail duplicado", async () => {
    const payload = {
      name: "Dev Senior",
      email: "duplicado@empresa.com",
      role: "USER" as const,
    };
    await userService.createUser(payload);

    await expect(userService.createUser(payload)).rejects.toThrow(
      ConflictError,
    );
  });
});
