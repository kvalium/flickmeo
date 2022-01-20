import express from 'express';
import { BookmarkServiceInterface } from '../domain';
export const bookmarksRouter = express.Router();

export class BookmarksController {
  constructor(
    private readonly bookmarkService: BookmarkServiceInterface,
    private readonly router = express.Router()
  ) {
    this.setRoutes();
  }

  getRouter = () => this.router;

  private setRoutes = () => {
    this.router
      .post('/', async (req, res) => {
        try {
          const { link } = req.body;
          const result = await this.bookmarkService.addFromLink(link);
          res.json({ success: result });
        } catch (error) {
          res.json({ success: false, error });
        }
      })
      .put('/', async (req, res) => {
        try {
          const { bookmark } = req.body;
          const result = await this.bookmarkService.update(bookmark);
          res.json({ success: result });
        } catch (error) {
          res.json({ success: false, error });
        }
      })
      .get('/', async (_req, res) => {
        try {
          const bookmarks = await this.bookmarkService.getAll();
          res.json({ success: true, payload: bookmarks });
        } catch (error) {
          res.json({ success: false, error });
        }
      })
      .delete('/:id', (req, res) => {
        try {
          const { id } = req.params;
          const result = this.bookmarkService.delete(id);
          res.json({ success: result });
        } catch (error) {
          res.json({ success: false, error });
        }
      });
  };
}
