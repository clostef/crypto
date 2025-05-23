import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';
import { checkToken } from './check-token.js';

const server = jsonServer.create();
const router = jsonServer.router('backend/db.json');
const middlewares = jsonServer.defaults();
const PORT = 3111;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.path.startsWith('/wallets') && req.method === 'GET') {
    try {
      const { db, userId } = checkToken(req);
      const wallet = db.wallets.find((wallet) => wallet.userId === userId);

      return wallet ? res.json(wallet) : res.json({ balance: 0 });
    } catch (e) {
      return res.status(e.status).json({ error: e.message });
    }
  }

  if (req.path.startsWith('/transactions') && req.method === 'GET') {
    try {
      const { db, userId } = checkToken(req);
      const transactions = db.transactions.filter(
        (transaction) => transaction.userId === userId
      );

      return res.json(transactions);
    } catch (e) {
      return res.status(e.status).json({ error: e.message });
    }
  }

  next();
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const dbFilePath = path.join(process.cwd(), 'backend/db.json');
  const db = JSON.parse(fs.readFileSync(dbFilePath, 'UTF-8'));
  const user = db.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.json({
      email: user.email,
      name: user.name,
      firstname: user.firstname,
      profileImage: user.profileImage,
      token: user.token,
    });
  } else {
    res.status(401).json({ error: 'Incorrect email or password' });
  }
});

server.put('/edit-user', (req, res) => {
  try {
    const { db, userId } = checkToken(req);
    const user = db.users.find((user) => user.id === userId);

    const { name, firstname, email } = req.body;

    if (!name && !firstname && !email) {
      return res.status(400).json({
        error: 'At least one of name, firstname, or email must be provided',
      });
    }

    if (name) user.name = name;
    if (firstname) user.firstname = firstname;
    if (email) user.email = email;

    fs.writeFileSync(
      path.join(process.cwd(), 'backend/db.json'),
      JSON.stringify(db, null, 2)
    );

    res.status(202).json({ message: 'User updated successfully' });
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

server.get('/charts/:crypto/:period', (req, res) => {
  const dbFilePath = path.join(process.cwd(), 'backend/db.json');
  const db = JSON.parse(fs.readFileSync(dbFilePath, 'UTF-8'));

  const crypto = req.params.crypto.toUpperCase();
  const period = req.params.period.toLowerCase();

  if (db.charts[crypto] && db.charts[crypto][period]) {
    res.json(db.charts[crypto][period]);
  } else {
    res.status(404).send('Crypto or period not found');
  }
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
