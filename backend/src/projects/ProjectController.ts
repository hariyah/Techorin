import { Request, Response } from "express";
import { ProjectService } from "./ProjectService";
import { ProjectStatus } from "../entities/Project";

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, status } = req.body;
      const newProject = await this.projectService.createProject(
        title,
        description,
        status as ProjectStatus
      );
      res.status(201).json(newProject);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await this.projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectById(id);
      if (!project) {
        res.status(404).json({ message: "Project not found." });
        return;
      }
      res.status(200).json(project);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const updatedProject = await this.projectService.updateProject(
        id,
        title,
        description,
        status as ProjectStatus
      );
      if (!updatedProject) {
        res.status(404).json({ message: "Project not found." });
        return;
      }
      res.status(200).json(updatedProject);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.projectService.deleteProject(id);
      if (!deleted) {
        res.status(404).json({ message: "Project not found." });
        return;
      }
      res.status(204).send(); // No content
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}