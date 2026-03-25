import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
        
        body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLowercase()
        .withMessage("Username must be in lowercase")
        .isLength({min:3})
        .withMessage("Username must be atleast 3 chars")
    ]
}

const userLoginValidator = () => {
    return [
        body("email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),
        
        body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min:3})
        .withMessage("Password must be atleast 3 chars")
    ]
}

export { userRegisterValidator, userLoginValidator };