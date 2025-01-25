import { Request, Response } from "express";
import db from "@/models/database";
import * as Metadata from "@/services/gym-metadata-service";
import * as Predict from "@/services/predict-occupancy-service";
import { GYM_NAMES, HttpStatus, GymName } from "@/utils/constants";
import { errorMessage } from "@/utils/helper";

export const getAllMetadata = async (req: Request, res: Response) => {
    try {
      const data = await Metadata.getAllMetadataHelper();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
    }
};
  
export const getMetadata = async (req: Request, res: Response) => {
    const { gym } = req.params;
    try {
      const data = await Metadata.getGymMetadataHelper(gym as GymName); // Temporary until validation
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
    }
};