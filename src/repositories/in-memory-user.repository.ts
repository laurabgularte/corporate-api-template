import { randomUUID } from "crypto";
import { IUserRepository } from "./user.repository.interface";
import { CreateUserDTO, UserResponseDTO } from "../schemas/user.schema";

export class InMemoryUserRepository implements IUserRepository {
  private users: UserResponseDTO[] = [];

  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const user: UserResponseDTO = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<UserResponseDTO | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async findById(id: string): Promise<UserResponseDTO | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findAll(): Promise<UserResponseDTO[]> {
    return this.users;
  }
}
