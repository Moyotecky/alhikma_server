import CareerRepository from "./career.repository";
import { ICareer } from "./career.interface";
import shortUUID from "short-uuid";
import logger from "../../utils/logging/logger";

const careerRepository = new CareerRepository();

class CareerService {

    async getAllCareers() {
        try {
            return await careerRepository.getAll();
        } catch (error) {
            // Handle error
            logger.error("Error in getAllCareers:", error);
            throw error;
        }
    }

    async getCareersWithPagination(page: number, limit: number) {
        try {
            return await careerRepository.getCareersWithPagination(page, limit);
        } catch (error) {
            logger.error("Error in getCareersWithPagination:", error);
            throw error;
        }
    }

    /**
     * Asynchronously search careers based on the provided search term, location, work location, and level.
     *
     * @param {string} searchTerm - the search term for careers
     * @param {string} location - the location for careers
     * @param {string} workLocation - the work location for careers
     * @param {string} level - the level for careers
     * @return {Promise<Careers[]>} a promise that resolves to the search results
     */
    async searchCareers(searchTerm: string, location: string, workLocation: string, level: string) {
        const filters: any = {};
        const searchTermRegex = new RegExp(searchTerm, "i");
        if (searchTerm) {
            filters.$or = [
                { name: searchTermRegex },
                { description: searchTermRegex }
            ];
        }
        if (location) {
            filters.location = location;
        }
        if (workLocation) {
            filters.work_location = workLocation;
        }
        if (level) {
            filters.level = { $in: level.split(",") };
        }
        return await careerRepository.getWithFilters(filters);
    }

    async getPublicCareers() {
        try {
            return await careerRepository.getCareers();
        } catch (error) {
            // Handle error
            logger.error("Error in getPublicCareers:", error);
            throw error;
        }
    }

    async getCareerByShortId(shortId: string) {
        try {
            return await careerRepository.getByShortId(shortId);
        } catch (error) {
            // Handle error
            logger.error("Error in getCareerByShortId:", error);
            throw error;
        }
    }

    async addNewCareer(career: ICareer) {
        try {
            career.shortid = shortUUID.generate();
            career.date = new Date();
            return await careerRepository.addCareer(career);
        } catch (error) {
            logger.error("Error in addNewCareer:", error);
            throw error;
        }
    }

    async updateCareer(id: string, updatedFields: Partial<ICareer>) {
        try {
            return await careerRepository.updateCareer(id, updatedFields);
        } catch (error) {
            logger.error("Error in updateCareer:", error);
            throw error;
        }
    }

    async markCareerAsHired(id: string) {
        try {
            return await careerRepository.markAsHired(id);
        } catch (error) {
            // Handle error
            logger.error("Error in markCareerAsHired:", error);
            throw error;
        }
    }

    async markCareerAsNotHired(id: string) {
        try {
            return await careerRepository.markAsNotHired(id);
        } catch (error) {
            // Handle error
            logger.error("Error in markCareerAsNotHired:", error);
            throw error;
        }
    }

    async deleteCareer(id: string) {
        try {
            return await careerRepository.deleteCareer(id);
        } catch (error) {
            // Handle error
            logger.error("Error in deleteCareer:", error);
            throw error;
        }
    }

    async getPublishedCareers() {
        try {
            return await careerRepository.getPublished();
        } catch (error) {
            // Handle error
            logger.error("Error in getPublishedCareers:", error);
            throw error;
        }
    }

    async findCareersWithinDateRange(startDate: Date, endDate: Date) {
        try {
            return await careerRepository.findWithinDate(startDate, endDate);
        } catch (error) {
            logger.error("Error in findCareersWithinDateRange:", error);
            throw error;
        }
    }
}

export default CareerService;
