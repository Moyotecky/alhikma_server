import ApplicationRepository from './application.repository';
import IApplication from './application.interface';

const applicationRepository = new ApplicationRepository();

export default class ApplicationService {
    async createApplication(applicationData: IApplication): Promise<any> {
        try {
            return await applicationRepository.create(applicationData);
        } catch (error) {
            throw error;
        }
    }

    async getApplicationById(applicationId: string): Promise<IApplication | null> {
        try {
            return await applicationRepository.getById(applicationId);
        } catch (error) {
            throw error;
        }
    }

    async updateApplication(applicationId: string, updatedData: Partial<IApplication>): Promise<IApplication | null> {
        try {
            return await applicationRepository.update(applicationId, updatedData);
        } catch (error) {
            throw error;
        }
    }

    async deleteApplication(applicationId: string): Promise<IApplication | null> {
        try {
            return await applicationRepository.delete(applicationId);
        } catch (error) {
            throw error;
        }
    }

    async getApplicationsByJobId(jobId: string): Promise<IApplication[]> {
        try {
            return await applicationRepository.getByJobId(jobId);
        } catch (error) {
            throw error;
        }
    }

    async getAllApplications(): Promise<IApplication[]> {
        try {
            return await applicationRepository.getAll();
        } catch (error) {
            throw error;
        }
    }
}
