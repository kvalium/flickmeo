import express from 'express';
export const tagsRouter = express.Router();

tagsRouter
  .post('/', (_req, res) => {
    try {
      res.json({ success: true });
    } catch (error) {
      res.json({ sucess: false, error });
    }
  })
  .get('/', (_req, res) => {
    try {
      res.json({ success: true, payload: [] });
    } catch (error) {
      res.json({ sucess: false, error });
    }
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    try {
      res.json({ success: true, payload: id });
    } catch (error) {
      res.json({ sucess: false, error });
    }
  });
