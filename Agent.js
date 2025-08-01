import Agent from './index.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("🧠 Your query: ", async (userQuery) => {
  await Agent(userQuery);
  rl.close();
});
