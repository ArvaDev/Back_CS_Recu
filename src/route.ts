import { Router } from "express";
import userRt from "./users/routes/user.router";
import classRt from "./class/routes/class.router";
import pubRt from "./publications/routes/publication.router";
const router = Router();
router.use(userRt);
router.use(classRt);
router.use(pubRt);
export default router;