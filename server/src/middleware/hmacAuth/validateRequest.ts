import crypto from "crypto";
import config from "../../config";

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
  timestamp: unknown,
  signature: unknown,
  data: unknown
): ValidationResult => {
  // Check if required fields are present
  if (!timestamp || !signature || !data) {
    return {
      isValid: false,
      error: "Missing required headers or data",
    };
  }

  // Check if data is string
  if (typeof data !== "string") {
    return {
      isValid: false,
      error: "Invalid data format",
    };
  }

  // Validate timestamp format and expiry
  const timestampStr = String(timestamp);
  const requestTime = new Date(timestampStr).getTime();
  if (isNaN(requestTime)) {
    return {
      isValid: false,
      error: "Invalid timestamp format",
    };
  }

  const currentTime = new Date().getTime();
  if (currentTime - requestTime > REQUEST_EXPIRY_MS) {
    return {
      isValid: false,
      error: "Request expired",
    };
  }

  // Verify signature
  try {
    const dataToSign = `${timestampStr}${data}`;
    const expectedSignature = crypto
      .createHmac("sha256", HMAC_SECRET)
      .update(dataToSign)
      .digest("hex");

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(signature as string),
      Buffer.from(expectedSignature)
    );

    if (!isSignatureValid) {
      return {
        isValid: false,
        error: "Invalid signature",
      };
    }
  } catch {
    return {
      isValid: false,
      error: "Invalid signature format",
    };
  }

  return { isValid: true };
};
