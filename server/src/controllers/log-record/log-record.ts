import { Request, Response } from "express";
import db from "@/models/database";
import { LogRecordType } from "@/models/types";
import { HttpStatus, GymName, errorMessage, getESTDate } from "@/utils";

// Get every Log Record from every gym.
export const allLogRecords = async (req: Request, res: Response) => {
  try {
    const records = await db.getLogRecords();
    res.status(HttpStatus.OK).json(records);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Get Log Records from a specific gym.
export const gymLogRecords = async (req: Request, res: Response) => {
  const { gym } = req.params;

  try {
    const data = await db.getLogRecords({ gym: gym as GymName });
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Insert a sensor log into the database.
export const createLogRecord = async (req: Request, res: Response) => {
  const { entries, exits } = req.body;
  const { gym } = req.params;

  console.log("Received log:", { gym, entries, exits });

  // Validate input
  if (entries < 0 || exits < 0) {
    res.status(HttpStatus.BadRequest).json({ error: "Invalid log" });
    return;
  }
  if (entries > 30 || exits > 30) {
    res.status(HttpStatus.BadRequest).json({ error: "Invalid log Greater than Expected" });
    return;
  }

  // Insert into database
  try {
    const logRecord: LogRecordType = {
      gym: gym as GymName,
      time: getESTDate(),
      entries: entries as number,
      exits: exits as number,
    };
    await db.insertLogRecords([logRecord]);
    res
      .status(HttpStatus.OK)
      .json({ success: `Inserted Log record into ${gym}` });
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};
