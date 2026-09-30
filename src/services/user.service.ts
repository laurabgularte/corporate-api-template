import { IUserRepository } from "../repositories/user.repository.interface";
import { CreateUserDTO, UserResponseDTO } from "../schemas/user.schema";
import { ConflictError, NotFoundError } from "../errors/app-error";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new ConflictError("E-mail já cadastrado no sistema");
    }

    return await this.userRepository.create(data);
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError(`Usuário com ID ${id} não foi encontrado`);
    }
    return user;
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    return await this.userRepository.findAll();
  }
}
