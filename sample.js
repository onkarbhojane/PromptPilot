import axios from "axios";
import systemPrompt from "./System_prompt.js";
import Tools_map from "./Tools.js";
// import openWhatsApp, { client, isClientReady } from "./controllers/WhatsApp/WhatsAppHandler.js";

// client.initialize(); // Initialize WhatsApp client
// - openWhatsApp(input: string): Sends a WhatsApp message. Format: "name|message"

const Agent = async () => {
  const messages = [{role:"system Environment","content":"you have to all stuff in C:\Users\Onkar\OneDrive\Desktop\Environment"},{ role: "system", content: systemPrompt }];
  const userQuery = "add numbers 1 and 2";
  messages.push({ role: "user", content: userQuery });

  while (true) {
    try {
      const response = await axios.post("http://localhost:11434/api/chat", {
        model: "deepseek-coder:6.7b",
        messages,
        stream: false,
        format: "json",
        options: { temperature: 0.7, num_ctx: 4096 },
      });

      const content = response.data.message?.content;
      console.log(`🤖 ${content}`);
      messages.push({ role: "assistant", content });

      let parsed;
      try {
        parsed = typeof content === "string" ? JSON.parse(content) : content;
      } catch (err) {
        console.error("❌ Invalid JSON format received from model:", content);
        return;
      }

      if (parsed.step === "think") {
        console.log(`🤔 ${parsed.content}`);
        continue;
      } else if (parsed.step === "action") {
        const tool = parsed.tool;
        const input = parsed.input;
        console.log(`🤖 Tool Call ${tool}(${input})`);

        const output = await Tools_map[tool](input);

        messages.push({
          role: "assistant",
          content: JSON.stringify({
            step: "observe",
            tool: tool,
            input: input,
            content: output,
          }),
        });
        continue;
      } else if (parsed.step === "observe") {
        console.log(`👀 ${parsed.content}`);
        continue;
      } else if (parsed.step === "output") {
        console.log(`👋 ${parsed.content}`);
        break;
      }
    } catch (err) {
      console.error(err);
      break;
    }
  }
};

Agent();

// 🕓 Wait until WhatsApp client is ready
// client.on("ready", async () => {
//   await  // ✅ start Agent after ready
// });
