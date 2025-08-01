import { exec } from "node:child_process";
import path from "path";

const ENV_PATH = "C:\\Users\\Onkar\\OneDrive\\Desktop\\Environment";

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: ENV_PATH }, (error, stdout, stderr) => {
      if (error) {
        return reject(`❌ Error: ${error.message}`);
      } else {
        return resolve(`✅ Command executed.\nstdout: ${stdout}\nstderr: ${stderr}`);
      }
    });
  });
}

export default executeCommand;
