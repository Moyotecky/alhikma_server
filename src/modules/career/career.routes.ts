import { Router } from "express";
import CareerController from "./career.controller";

const router = Router();
const careerController = new CareerController();

router.get("/", careerController.getAllCareers);
router.get("/:shortId", careerController.getCareerByShortId);
router.post("/", careerController.addNewCareer);
router.put("/:id", careerController.updateCareer);
router.delete("/:id", careerController.deleteCareer);

export default router;