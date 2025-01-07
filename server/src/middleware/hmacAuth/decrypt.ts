// Decryption helper functions
import crypto from "crypto";
import config from "../../config";

// Validate required configuration
if (!config.encryptionKey || !config.ivLength) {
  throw new Error("Missing required encryptionKey or ivLength configuration");
}

// Configuration constants
const ENCRYPTION_KEY = Buffer.from(config.encryptionKey, "utf-8");
const IV_LENGTH = config.ivLength;

interface EncryptedComponents {
  iv: Buffer;
  data: Buffer;
}

const separateIvAndData = (buffer: Buffer): EncryptedComponents => {
  return {
    iv: Buffer.alloc(IV_LENGTH, buffer.subarray(0, IV_LENGTH)),
    data: Buffer.alloc(buffer.length - IV_LENGTH, buffer.subarray(IV_LENGTH)),
  };
};

const validateDecryptedValue = (value: number): boolean => {
  return value === 0 || value === 1;
};

export const decrypt = (encryptedData: string): number => {
  try {
    // Convert base64 string to buffer and separate IV and data
    const fullBuffer = Buffer.from(encryptedData, "base64");
    const { iv, data } = separateIvAndData(fullBuffer);

    // Create decipher and decrypt
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    const decrypted = Buffer.concat([
      decipher.update(data),
      decipher.final(),
    ]).toString("utf8");

    // Parse and validate the decrypted value
    const value = parseInt(decrypted);
    if (!validateDecryptedValue(value)) {
      throw new Error("Invalid decrypted value");
    }

    return value;
  } catch (error) {
    throw new Error("Decryption failed");
  }
};
