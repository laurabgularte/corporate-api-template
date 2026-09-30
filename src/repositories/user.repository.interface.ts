import { CreateUserDTO, UserResponseDTO } from "../schemas/user.schema";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserResponseDTO>;
  findByEmail(email: string): Promise<UserResponseDTO | null>;
  findById(id: string): Promise<UserResponseDTO | null>;
  findAll(): Promise<UserResponseDTO[]>;
}
