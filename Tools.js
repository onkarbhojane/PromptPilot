import executeCommand from "./controllers/Terminal/TerminalAccess.js";
import { getWeatherInfo, add } from "./controllers/General.js";
import openChrome, { openGoogleSearch } from "./controllers/chrome/ChromeHandler.js";

const Tools_map = {
  getWeatherInfo,
  executeCommand,
  add,
  openChrome,
  openGoogleSearch,
  // openWhatsApp,
};

export default Tools_map;