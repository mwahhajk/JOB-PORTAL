import exppress from "express"
import {  register,login, logout} from "../controllers/userController.js";

const router=exppress.Router();

router.post("/create",register)
router.post("/login",login)
router.get("/logout",logout)

export default router;