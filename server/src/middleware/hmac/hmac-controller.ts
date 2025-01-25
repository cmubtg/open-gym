import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@/utils";
import { validateRequest } from "./validate-request";
import { decrypt } from "./decrypt";

// Authentication & Confidentiality: Ensures that the request is from a valid source then
// decrypts the data to be processed and stored.
export const hmacAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const timestamp = req.headers["x-timestamp"] as string;
    const receivedSignature = req.headers["x-signature"] as string;
    const encryptedData = req.body.direction as string;

    const { isValid, error } = validateRequest(
      timestamp,
      receivedSignature,
      encryptedData
    );
  
    if (!isValid) {
      res.status(HttpStatus.BadRequest).json({ error: error });
      return;
    }

    // Decrypt
    try {
      req.body.direction = decrypt(encryptedData);
      next();
      return;
    } catch (error) {
      res.status(HttpStatus.BadRequest).json({ error: "Invalid encrypted data" });
      return;
    }
  } catch (error) {
    res.status(HttpStatus.InternalServerError).json({ error: "Authentication failed" });
    return;
  }
};
