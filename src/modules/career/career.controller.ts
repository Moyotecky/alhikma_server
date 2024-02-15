import CareerService from "./career.service";
import { Request, Response } from "express";
import logger from "../../utils/logging/logger";
import CareerValidator from "./career.validator";
import { ICareer } from "./career.interface";

const careerService = new CareerService();

class CareerController {
    getDrafts(arg0: string, getDrafts: any) {
        throw new Error("Method not implemented.");
    }
    async getAllCareers(req: Request, res: Response) {
        try {
            const careers = await careerService.getAllCareers();
            res.json(careers);
        } catch (error) {
            logger.error("Error in getAllCareers:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async fetchCareers(req: Request, res: Response) {
        try {
            const careers = await careerService.getPublicCareers();
            res.json(careers);
        } catch (error) {
            logger.error("Error in fetchCareers:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async markCareerAsHired(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updatedCareer = await careerService.markCareerAsHired(id);
            res.json(updatedCareer);
        } catch (error) {
            logger.error("Error in markCareerAsHired:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getCareersWithPagination(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const careers = await careerService.getCareersWithPagination(page, limit);
            res.json(careers);
        } catch (error) {
            logger.error("Error in getCareersWithPagination:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async searchCareers(req: Request, res: Response) {
        try {
            const { searchTerm, location, workLocation, level } = req.query;
            const careers = await careerService.searchCareers(searchTerm as string, location as string, workLocation as string, level as string);
            res.json(careers);
        } catch (error) {
            console.error("Error in searchCareers:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getCareerByShortId(req: Request, res: Response) {
        try {
            const shortId = req.params.shortId;
            const career = await careerService.getCareerByShortId(shortId);
            if (!career) {
                res.status(404).json({ error: "Career not found" });
            } else {
                res.json(career);
            }
        } catch (error) {
            logger.error("Error in getCareerByShortId:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async addNewCareer(req: Request, res: Response) {
        try {
            const careerData: ICareer = req.body;
            const validation = CareerValidator.validate(careerData);
            if (validation.error) {
                return res.status(400).json({ error: validation.error.details[0].message });
            }
            const newCareer = await careerService.addNewCareer(careerData);
            res.status(201).json(newCareer);
        } catch (error) {
            logger.error("Error in addNewCareer:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async updateCareer(req: Request, res: Response) {
        try {
            const careerId = req.params.id;
            const updatedFields: Partial<ICareer> = req.body;
            const updatedCareer = await careerService.updateCareer(careerId, updatedFields);
            res.json(updatedCareer);
        } catch (error) {
            logger.error("Error in updateCareer:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async deleteCareer(req: Request, res: Response) {
        try {
            const careerId = req.params.id;
            await careerService.deleteCareer(careerId);
            res.status(204).send();
        } catch (error) {
            logger.error("Error in deleteCareer:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }


}

export default CareerController;
