import { Bookmark } from '../types/Bookmark';

export interface BookmarkServiceInterface {
  getAll(): Promise<Bookmark[]>;
  addFromLink(link: string): Promise<boolean>;
  update(bookmark: Bookmark): Promise<boolean>;
  delete(bookmarkId: string): Promise<boolean>;
}
