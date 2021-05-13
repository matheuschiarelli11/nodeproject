import { Router } from "express";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import authMiddleware from "../middlewares/auth";
import UserDateController from "../controllers/UserDateController";

const routes = new Router();

routes.get("/user", UserController.show);
routes.post("/user", UserController.index);
routes.put("/user/:id", authMiddleware, UserController.update);
routes.delete("/user/:id", UserController.delete);

routes.post("/session", SessionController.store);

routes.get("/info/:id", UserDateController.info);
routes.get("/info", UserDateController.todayInfo);
routes.get("/infoM", UserDateController.monthInfo);

export default routes;
