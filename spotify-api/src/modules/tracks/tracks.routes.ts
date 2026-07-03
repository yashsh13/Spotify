import { Router } from "express";
import { preSignedUrlSchema, uploadTrackSchema, getTrackInfoSchema, getAllTracksSchema, getTracksByGenreSchema, mostPlayedSchema, updateTrackSchema, deleteTrackSchema } from "./tracks.schema.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import * as ctrl from "./tracks.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

const tracksRouter: Router = Router();

tracksRouter.post('/presignedurl/put', authMiddleware, adminMiddleware, validationMiddleware(preSignedUrlSchema), asyncHandler(ctrl.presignedUrlController));
tracksRouter.post('/upload', authMiddleware, adminMiddleware, validationMiddleware(uploadTrackSchema), asyncHandler(ctrl.uploadTrackController));
tracksRouter.get('/listen/:trackId', authMiddleware, validationMiddleware(getTrackInfoSchema), asyncHandler(ctrl.getTrackInfoController));
tracksRouter.get('/all/:pageNo', authMiddleware, validationMiddleware(getAllTracksSchema), asyncHandler(ctrl.getAllTracksController));
tracksRouter.get('/genre/:genre', authMiddleware, validationMiddleware(getTracksByGenreSchema), asyncHandler(ctrl.getTracksByGenreController));
tracksRouter.get('/most-played/:topCount', authMiddleware, validationMiddleware(mostPlayedSchema),asyncHandler(ctrl.getMostPlayedTracksController));
tracksRouter.patch('/update/:trackId', authMiddleware, adminMiddleware, validationMiddleware(updateTrackSchema), asyncHandler(ctrl.updateTrackController));
tracksRouter.delete('/delete/:trackId', authMiddleware, adminMiddleware, validationMiddleware(deleteTrackSchema), asyncHandler(ctrl.deleteTrackController));

export default tracksRouter;