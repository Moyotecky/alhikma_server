import { Router } from "express";
import CareerController from "./career.controller";
import { tokenVerification, checkAdminMiddleware } from "../../middleware/auth.middleware";

const router = Router();
const careerController = new CareerController();

router.get("/", careerController.fetchCareers);
router.get("/all", tokenVerification, checkAdminMiddleware, careerController.getAllCareers);
router.get("/drafts", tokenVerification, checkAdminMiddleware, careerController.getDrafts);
router.get('/search', careerController.searchCareers);
router.get("/:shortId", careerController.getCareerByShortId);
router.post("/", tokenVerification, checkAdminMiddleware, careerController.addNewCareer);
router.put("/:id", tokenVerification, checkAdminMiddleware, careerController.updateCareer);
router.put("/:id/hire",tokenVerification, checkAdminMiddleware, careerController.markCareerAsHired);
router.delete("/:id", tokenVerification, checkAdminMiddleware, careerController.deleteCareer);


export default router;