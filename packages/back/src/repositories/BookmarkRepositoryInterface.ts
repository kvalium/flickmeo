import { Bookmark } from '../types/Bookmark';

export interface BookmarkRepositoryInterface {
  getAll(): Promise<Bookmark[]>;
  add(bookmark: Bookmark): Promise<boolean>;
  update(bookmark: Bookmark): Promise<boolean>;
  delete(bookmarkId: string): Promise<boolean>;
}
