import express from 'express';
export const tagsRouter = express.Router();

const fakeBookmarks = [
  {
    id: '1',
    url: 'https://vimeo.com/292532411',
    title: 'cats',
    author: 'J. Doe',
    dateAdded: '2015-08-25 14:35:19',
  },
  {
    id: '2',
    url: 'https://vimeo.com/292532412',
    title: 'cats 2',
    author: 'J. Doe',
    dateAdded: '2011-08-25 14:35:19',
  },
  {
    id: '3',
    url: 'https://vimeo.com/292532413',
    title: 'cats 3',
    author: 'J. Doe',
    dateAdded: '2011-08-25 14:35:19',
  },
];

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
      res.json({ success: true, payload: fakeBookmarks });
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
