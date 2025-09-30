import { AppDataSource } from "../../ormconfig";
import { Project, ProjectStatus } from "../entities/Project";
import { Repository } from "typeorm";

export class ProjectService {
  private projectRepository: Repository<Project>;

  constructor() {
    this.projectRepository = AppDataSource.getRepository(Project);
  }

  async createProject(title: string, description: string, status: ProjectStatus): Promise<Project> {
    const project = this.projectRepository.create({ title, description, status });
    return this.projectRepository.save(project);
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({ where: { id } });
  }

  async updateProject(
    id: string,
    title?: string,
    description?: string,
    status?: ProjectStatus
  ): Promise<Project | null> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      return null;
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (status) project.status = status;

    return this.projectRepository.save(project);
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await this.projectRepository.delete(id);
    return result.affected !== 0;
  }
}