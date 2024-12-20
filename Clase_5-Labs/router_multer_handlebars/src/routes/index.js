import express from "express";
import usersRouter from "./usersRouter.js";
import petsRouter from "./petsRouter.js";
import viewsRouter from "./viewsRouter.js";

const router = express.Router();

router.use("/api/users", usersRouter);
router.use("/api/pets", petsRouter);
router.use("/views", viewsRouter);

export default router;
