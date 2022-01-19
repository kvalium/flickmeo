import { app } from './app';

const PORT = process.env.PORT || 8999;
app.listen(PORT, () => {
  console.log(`🎉 backend up & running on port ${PORT}!`);
});
