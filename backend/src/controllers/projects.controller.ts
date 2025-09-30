import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { Project } from "../entities/Project";

const projectRepo = () => AppDataSource.getRepository(Project);

export const getProjects = async (req: Request, res: Response) => {
    const projects = await projectRepo().find({ order: { createdAt: "DESC" } });
    res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
    const { title, description, status } = req.body;
    if (!title || !description) return res.status(400).json({ message: "title and description required" });

    const project = projectRepo().create({ title, description, status: status || "pending" });
    await projectRepo().save(project);
    res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const proj = await projectRepo().findOneBy({ id });
    if (!proj) return res.status(404).json({ message: "Project not found" });

    proj.title = title ?? proj.title;
    proj.description = description ?? proj.description;
    proj.status = status ?? proj.status;
    await projectRepo().save(proj);
    res.json(proj);
};

export const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const proj = await projectRepo().findOneBy({ id });
    if (!proj) return res.status(404).json({ message: "Project not found" });

    await projectRepo().remove(proj);
    res.json({ message: "Deleted" });
};
