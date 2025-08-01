import systemPrompt from "./System_prompt.js";
import Tools_map from "./Tools.js";
import axios from "axios";


const Agent = async (userQuery) => {
  const messages = [
    { role: "system", content: systemPrompt }
  ];
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

export default Agent;