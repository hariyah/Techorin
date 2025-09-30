import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { permit } from "../middlewares/role.middleware";

const router = Router();

router.get("/", authenticateJWT, getProjects);
router.post("/", authenticateJWT, permit("admin"), createProject);
router.put("/:id", authenticateJWT, permit("admin"), updateProject);
router.delete("/:id", authenticateJWT, permit("admin"), deleteProject);

export default router;
