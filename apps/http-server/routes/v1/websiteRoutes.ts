import { Router } from "express";
import { GetStatus, getAllWebsites } from "../../controllers/websiteController";

const router = Router();

router.post("/status/:websiteId", GetStatus);
router.get("/get-all-website", getAllWebsites);

export default router;
