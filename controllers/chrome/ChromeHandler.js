import { exec } from "node:child_process";
import os from 'os';
import { promisify } from "node:util";
const isWindows = os.platform() === "win32";
const executeCommand = promisify(exec);

const openChrome = (input) => {
  return new Promise((resolve, reject) => {
    let url = "https://www.google.com";
    
    if (input && input.startsWith("http")) {
      url = input;
    } else if (input && input.trim() !== "") {
      // if not URL, treat as search
      const query = encodeURIComponent(input);
      url = `https://www.google.com/search?q=${query}`;
    }

    exec(`start chrome "${url}"`, (error, stdout, stderr) => {
      if (error) {
        reject(`❌ Failed to open Chrome: ${error.message}`);
      } else {
        resolve(`✅ Chrome opened with: ${url}`);
      }
    });
  });
};
const openGoogleSearch = (query) => {
  const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const command = isWindows
    ? `start chrome "${searchURL}"`
    : `google-chrome "${searchURL}"`; // or 'xdg-open' for Linux fallback

  return executeCommand(command);
};

export { openGoogleSearch };


export default openChrome;