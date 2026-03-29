import { Router } from "express";
import {
    getProjects,
    getProjectById,
    getProjectMembers,
    updateProject,
    deleteProject,
    addMembersToProject,
    createProject,
    deleteMember,
    updateMemberRole,
} from "../controllers/project.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
    createProjectValidator,
    addMemberToProjectValidator,
} from "../validators/index.js";
import {
    verifyJWT,
    validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRoles } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router
    .route("/")
    .get(getProjects)
    .post(createProjectValidator(), validate, createProject);

router
    .route("/:projectId")
    .get(validateProjectPermission(AvailableUserRole), getProjectById)
    .put(
        validateProjectPermission([UserRoles.ADMIN]),
        createProjectValidator(),
        validate,
        updateProject,
    )
    .delete(
        validateProjectPermission([UserRoles.ADMIN]),
        validate,
        deleteProject,
    );

router
    .route("/:projectId/members")
    .get(getProjectMembers)
    .post(
        validateProjectPermission([UserRoles.ADMIN]),
        addMemberToProjectValidator(),
        validate,
        addMembersToProject,
    );

router
    .route("/:projectId/members/:userId")
    .put(validateProjectPermission([UserRoles.ADMIN]), updateMemberRole)
    .delete(validateProjectPermission([UserRoles.ADMIN]), deleteMember);

export default router;
