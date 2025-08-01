# 🚀 PromptPilot — AI-Powered Task Automation Agent

**PromptPilot** is an advanced AI agent built using **Ollama** with **DeepSeek R1** that can understand natural language commands and execute them intelligently. It integrates terminal operations, WhatsApp messaging, Chrome browsing, and general utilities to act as your personal assistant.

---

## 🧠 Features

- 🖥️ Execute terminal commands programmatically  
- 💬 Send and receive messages via WhatsApp  
- 🌐 Control Chrome (open/search websites)  
- ⚙️ Run general tasks (file creation, directory scan, etc.)  
- 🔍 Smart prompt-to-action mapping using Ollama + DeepSeek R1  
- 🧩 Modular architecture (easy to extend)

---

## 📁 Project Structure

```
PromptPilot/
├── Agent.js               # Main agent loop (LLM interaction + decision-making)
├── SystemPrompt.js        # Defines initial system instruction for the agent
├── Tools.js               # Tool registry: maps commands to tool functions
├── index.js               # Entry point to run the agent
├── .env                   # Environment config (Twilio, Weather API, etc.)
├── /controllers
│   ├── chrome.js          # Chrome control utilities
│   ├── terminal.js        # Execute terminal commands
│   ├── whatsapp.js        # WhatsApp message interface
│   └── general.js         # Other general-purpose functions
├── package.json
├── .gitignore
```

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/onkarbhojane/PromptPilot.git
   cd PromptPilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup `.env` file**  
   Create a `.env` file in the root directory with the following:

   ```env
   TWILIO_SID=your_twilio_sid
   TWILIO_AUTH=your_twilio_auth_token
   WHATSAPP_NUMBER=whatsapp:+your_number
   OPENWEATHER_API=your_openweather_api_key
   ```

4. **Start Ollama with DeepSeek R1**
   ```bash
   ollama run deepseek-coder:latest
   ```

5. **Start the Agent**
   ```bash
   node index.js
   ```

---

## 💡 How It Works

- `Agent.js`: Handles prompt flow between user input and Ollama (DeepSeek R1), then maps the response to tools.  
- `SystemPrompt.js`: Provides base instruction context to the model.  
- `Tools.js`: Registers all available tools (terminal, WhatsApp, Chrome, general).  
- `controllers/`: Contains actual implementations of tool logic.

---

## 🔧 Add Your Own Tool

1. Create a new file in `controllers/` (e.g., `email.js`)
2. Export a function:
   ```js
   export async function sendEmail({ to, subject, body }) {
     // Your email logic here
   }
   ```
3. Register it in `Tools.js`:
   ```js
   import { sendEmail } from './controllers/email.js';
   tools.set("sendEmail", sendEmail);
   ```

---

## 📸 Example Use Cases

- "Open Google in Chrome and search for JavaScript tutorials."  
- "Send a message to my WhatsApp contact."  
- "Create a folder named `AI-Projects`."  
- "Run `ls` in terminal and tell me the output."  

---

## ⚠️ Security Notes

- `.env` is required to connect to third-party APIs. Never commit this to Git.  
- WhatsApp QR auth and session files must be handled carefully and securely.  

---

## 📃 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

- [Ollama](https://ollama.com/)  
- [DeepSeek](https://deepseek.com/)  
- [WhatsApp Web.js](https://wwebjs.dev/)  
- [Twilio](https://twilio.com/)  
- [OpenWeather](https://openweathermap.org/)
