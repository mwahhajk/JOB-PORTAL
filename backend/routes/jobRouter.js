import exppress from "express"
import { createJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router=exppress.Router();

router.post("/create",isAuthorized,createJob)

export default router;