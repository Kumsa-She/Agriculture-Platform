import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the Agriculture Platform');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
