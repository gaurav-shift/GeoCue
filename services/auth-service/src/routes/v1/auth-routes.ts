import { Router } from "express";
import UserController from "../../controllers/user-controller";
import { signupValidator } from "../../validators/signup-validator";
import validationMiddleware from "../../middlewares/validation-middleware";
import { body } from "express-validator";
import { setPasswordValidator } from "../../validators/signup-validator";

const router = Router();

const userController = new UserController();

router.post(
  "/signup/request-otp",
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),
  validationMiddleware,
  (req, res, next) => userController.requestSignupOtp(req, res, next)
);

router.post(
  "/signup/verify-otp",
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("otp")
    .trim()
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage("OTP must be a 6-digit number"),

  validationMiddleware,

  (req, res, next) =>
    userController.verifySignupOtp(req, res, next)
);

router.post(
  "/signup/set-password",
  ...setPasswordValidator,
  validationMiddleware,
  (req, res, next) => userController.setPassword(req, res, next)
);

export default router;