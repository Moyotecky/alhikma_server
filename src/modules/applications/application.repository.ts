import Application from "./application.model";
import IApplication from "./application.interface";


export default class ApplicationRepository {
    async create(applicationData: IApplication): Promise<any> {
        try {
            const newApplication = new Application(applicationData);
            return await newApplication.save();
        } catch (error) {
            throw error;
        }
    }

    async getById(applicationId: string): Promise<IApplication | null> {
        try {
            return await Application.findById(applicationId);
        } catch (error) {
            throw error;
        }
    }

    async update(applicationId: string, updatedData: Partial<IApplication>): Promise<IApplication | null> {
        try {
            return await Application.findByIdAndUpdate(applicationId, updatedData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async delete(applicationId: string): Promise<IApplication | null> {
        try {
            return await Application.findByIdAndDelete(applicationId);
        } catch (error) {
            throw error;
        }
    }

    async getByJobId(jobId: string): Promise<IApplication[]> {
        try {
            return await Application.find({ job_id: jobId });
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<IApplication[]> {
        try {
            return await Application.find({});
        } catch (error) {
            throw error;
        }
    }
}
