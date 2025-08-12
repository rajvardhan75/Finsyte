// ESM version
import { Router } from "express";
import { initConsent, fetchData } from "../controllers/aa.controller.js";
// If your middleware exports default:  import verifyJWT from "../middlewares/auth.middleware.js";
// If it exports named:              import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/consent/init", verifyJWT, initConsent);
router.post("/fetch", verifyJWT, fetchData);

export default router;
