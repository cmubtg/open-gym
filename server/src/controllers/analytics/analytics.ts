// Controller actions that interact with Occupancy Records.
import { Request, Response } from "express";
import { HttpStatus } from "@/utils";

// TODO: Update to take specific gym into account
export const getAnalytics = (req: Request, res: Response) => {
    res.status(HttpStatus.NotFound).json({ message: "Unimplemented" });
  };