import { Router } from "express";
import { ProjectController } from "../projects/ProjectController";
import { authenticateToken } from "../middleware/jwt.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { UserRole } from "../entities/User";

const router = Router();
const projectController = new ProjectController();

router.get("/", authenticateToken, projectController.getAllProjects.bind(projectController));
router.get("/:id", authenticateToken, projectController.getProjectById.bind(projectController));

// Admin-only routes
router.post("/", authenticateToken, authorizeRoles([UserRole.ADMIN]), projectController.createProject.bind(projectController));
router.put("/:id", authenticateToken, authorizeRoles([UserRole.ADMIN]), projectController.updateProject.bind(projectController));
router.delete("/:id", authenticateToken, authorizeRoles([UserRole.ADMIN]), projectController.deleteProject.bind(projectController));

export default router;
