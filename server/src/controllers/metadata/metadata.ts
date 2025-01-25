import { Request, Response } from "express";
import * as Metadata from "@/services/gym-metadata-service";
import { HttpStatus, GymName, errorMessage } from "@/utils";

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