import { Router } from "express";
import CareerController from "./career.controller";

const router = Router();
const careerController = new CareerController();

router.get("/", careerController.fetchCareers);
// router.get("/all", checkAdminMiddleware, careerController.getAllCareers);
// router.get("/drafts", checkAdminMiddleware, careerController.getDrafts);
router.get("/:shortId", careerController.getCareerByShortId);
// router.post("/", checkAdminMiddleware, careerController.addNewCareer);
router.put("/:id", careerController.updateCareer);
router.put("/:id/hire", careerController.markCareerAsHired);
router.delete("/:id", careerController.deleteCareer);
router.get('/search', careerController.searchCareers);


export default router;