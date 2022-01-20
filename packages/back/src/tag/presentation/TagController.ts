import express from 'express';
import { TagServiceInterface } from '../domain';
export const tagsRouter = express.Router();

export class TagController {
  constructor(
    private readonly tagService: TagServiceInterface,
    private readonly router = express.Router()
  ) {
    this.setRoutes();
  }

  getRouter = () => this.router;

  private setRoutes = () => {
    this.router
      .post('/', async (req, res) => {
        try {
          const { name, bookmarkId } = req.body;
          const result = await this.tagService.add(name, bookmarkId);
          res.json({ success: result });
        } catch (error) {
          res.json({ success: false, error });
        }
      })
      .put('/', async (req, res) => {
        try {
          const { tag } = req.body;
          const result = await this.tagService.update(tag);
          res.json({ success: result });
        } catch (error) {
          res.json({ success: false, error });
        }
      })
      .get('/:bookmarkId', async (req, res) => {
        try {
          const { bookmarkId } = req.params;
          const tags = await this.tagService.getAllByBookmarkId(bookmarkId);
          res.json({ success: true, payload: tags });
        } catch (error) {
          res.json({ success: false, error });
        }
      })
      .delete('/:id', (req, res) => {
        try {
          const { id } = req.params;
          const result = this.tagService.delete(id);
          res.json({ success: result });
        } catch (error) {
          res.json({ success: false, error });
        }
      });
  };
}
