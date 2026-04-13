import fs from "fs"
import path from "path"

const LOG_FILE = path.join(__dirname, "..", "..", "log.txt");
export function writeLog(message: string): void {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n\n`;
  fs.appendFileSync(LOG_FILE, logEntry, "utf8");
}

