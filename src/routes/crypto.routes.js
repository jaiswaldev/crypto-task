import { Router } from "express";
import { getDetails } from "../controllers/crypto.controllers.js";


const router = Router();


router.route("/stats").post(getDetails);

export default router;