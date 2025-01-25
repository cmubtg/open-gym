// Controller actions that interact with Occupancy Records.
import { Request, Response } from "express";
import db from "@/models/database";
import { HttpStatus, GymName } from "@/utils/constants";
import { errorMessage } from "@/utils/helper";

// TODO: Update to take specific gym into account
export const getAnalytics = (req: Request, res: Response) => {
    res.status(HttpStatus.NotFound).json({ message: "Unimplemented" });
  };