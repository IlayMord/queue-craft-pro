import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'users.json');

async function readUsers() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/email', async (req, res) => {
  const { email, password } = req.body;
  let users = await readUsers();
  let user = users.find(u => u.email === email && u.provider === 'email');
  if (user) {
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } else {
    user = { id: uuidv4(), provider: 'email', email, password };
    users.push(user);
    await writeUsers(users);
  }
  res.json(user);
});

app.post('/auth/phone', async (req, res) => {
  const { phone } = req.body;
  let users = await readUsers();
  let user = users.find(u => u.phone === phone && u.provider === 'phone');
  if (!user) {
    user = { id: uuidv4(), provider: 'phone', phone };
    users.push(user);
    await writeUsers(users);
  }
  res.json(user);
});

app.post('/auth/gmail', async (_req, res) => {
  let users = await readUsers();
  const user = { id: uuidv4(), provider: 'gmail', email: 'gmailUser@example.com' };
  users.push(user);
  await writeUsers(users);
  res.json(user);
});

app.get('/users/:id', async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const users = await readUsers();
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  users[idx] = { ...users[idx], ...req.body };
  await writeUsers(users);
  res.json(users[idx]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
