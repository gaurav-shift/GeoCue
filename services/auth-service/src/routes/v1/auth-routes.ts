import { Router } from "express";
import UserController from "../../controllers/user-controller";
import { signupValidator } from "../../validators/signup-validator";
import validationMiddleware from "../../middlewares/validation-middleware";

const router = Router();

const userController = new UserController();

router.post(
  "/signup",
  ...signupValidator,
  validationMiddleware,
  (req, res, next) => userController.createUser(req, res, next)
);

export default router;