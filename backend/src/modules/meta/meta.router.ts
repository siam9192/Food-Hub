import { Router } from "express";
import { metaControllers } from "./meta.controller.js";
import { authMiddleware, UserRole } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/meta/provider/summaries",
  authMiddleware(UserRole.provider),
  metaControllers.getAllSummariesForProvider,
);

export const metaRouter = router;
