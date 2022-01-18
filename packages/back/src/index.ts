import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Well done!');
});

app.listen(PORT, () => {
  console.log(`🎉 backend up & running on port ${PORT}!`);
});
