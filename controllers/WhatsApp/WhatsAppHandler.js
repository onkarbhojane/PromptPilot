import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const { Client, LocalAuth } = pkg;

const mob_dir = {
  "shubham pund": "9545600985",
  "manoj pandangle": "9529790024"
};

const client = new Client({
  authStrategy: new LocalAuth()
});

let isClientReady = false;

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('🔐 Authenticated successfully');
});

client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
  isClientReady = true;
});

client.on('auth_failure', msg => {
  console.error('❌ Authentication failed:', msg);
});

const openWhatsApp = async (input) => {
  if (!isClientReady) {
    const waitMsg = '⚠️ WhatsApp client is not ready yet.';
    console.warn(waitMsg);
    return waitMsg;
  }

  const [name, message] = input.split('|').map(str => str.trim().toLowerCase());
  const phoneNumber = mob_dir[name];

  if (!phoneNumber) {
    const notFoundMsg = `❌ Contact "${name}" not found in mob_dir.`;
    console.error(notFoundMsg);
    return notFoundMsg;
  }

  const chatId = `91${phoneNumber}@c.us`;

  try {
    await client.sendMessage(chatId, message);
    const success = `📩 Message sent to ${name}: "${message}"`;
    console.log(success);
    return success;
  } catch (err) {
    const fail = `❌ Error sending message to ${name}: ${err.message}`;
    console.error(fail);
    return fail;
  }
};

export { client, isClientReady };
export default openWhatsApp;
