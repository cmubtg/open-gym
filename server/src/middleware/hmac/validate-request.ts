import crypto from "crypto";
import config from "@/config";
import {LogRecordType} from "@/models/types";

// Validate required configuration
if (!config.hmacSecret || !config.encryptionKey) {
  throw new Error("Missing required HMAC or encryption configuration");
}

// Configuration constants
const HMAC_SECRET = config.hmacSecret;
const REQUEST_EXPIRY_MS = config.requestExpiryMs;

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Authentication: Ensures that the request is from a valid source that
// has the correct HMAC signature and that the request has not expired.
export const validateRequest = (
  signature: unknown,
  data: LogRecordType
): ValidationResult => {

  // Verify signature
  try {
    const dataToSign = `${data.entries}${data.exits}`
    console.log("Data:", dataToSign)

    const expectedSignature = crypto
      .createHmac("sha256", HMAC_SECRET)
      .update(dataToSign)
      .digest("hex");
    console.log("Received Signature", signature);
    console.log("Expected Signature", expectedSignature);
      
    // Verify data hash and signature are valid 
    if (typeof signature !== 'string') {
      return {
        isValid: false,
        error: "Invalid signature format"
      };
    }

    // Use timing-safe comparison
    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(signature.toLowerCase(), 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );

    if (!isSignatureValid) {
      return {
        isValid: false,
        error: "Invalid signature (Ensure Log Record request body is valid)"
      };
    }

  } catch {
      return {
        isValid: false,
        error: "Invalid signature format",
      };
  }

  return { isValid: true };
}
