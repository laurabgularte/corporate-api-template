import { Router } from "express";
import { healthRouter } from "./health.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/api/v1/users", userRouter);

export { router };
