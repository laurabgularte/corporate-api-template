import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newUser = await this.userService.createUser(req.body);
      res.status(201).json({ status: "success", data: newUser });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ status: "success", data: users });
    } catch (error) {
      next(error);
    }
  };
}
