import { Router } from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController";
import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authMiddleware";
import { validate } from "../middleware/validateRequest";
import {
  createLeadSchema,
  updateLeadSchema,
} from "../validations/leadValidation";

const router = Router();

router.use(protect);

router.route("/").get(getLeads).post(validate(createLeadSchema), createLead);

router
  .route("/:id")
  .get(getLeadById)
  .put(validate(updateLeadSchema), updateLead)
  .delete(authorizeRoles("Admin"), deleteLead);

export default router;
