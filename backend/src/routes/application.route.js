import express from "express"
import { addApplication, deleteApplication, getApplications, updateStatus } from "../controllers/applicalionsControllers.js";


const router = express.Router();

router.post("/", addApplication);
router.get("/", getApplications);
router.patch("/:id", updateStatus);
router.delete("/:id", deleteApplication);


export default router;