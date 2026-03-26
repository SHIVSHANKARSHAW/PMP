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

const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword")
        .trim()
        .notEmpty()
        .withMessage("Old Password is required")
        .isLength({min:3})
        .withMessage("Old Password must be atleast 3 chars"),
        
        body("newPassword")
        .trim()
        .notEmpty()
        .withMessage("New Password is required")
        .isLength({min:3})
        .withMessage("New Password must be atleast 3 chars")
    ]
}

const userForgotPasswordValidator = () => {
    return [
        body("email")
        .notEmpty()
        .withMessage("Email is Required")
        .isEmail()
        .withMessage("Email is Invalid")

    ]
}

const userResetForgotPasswordValidator = () => {
    return [body("newPassword").notEmpty().withMessage("Password is required")];
};


export { userRegisterValidator, userLoginValidator, userChangeCurrentPasswordValidator, userForgotPasswordValidator, userResetForgotPasswordValidator };