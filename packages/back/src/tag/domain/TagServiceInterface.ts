import { Tag } from './Tag';

export interface TagServiceInterface {
  getAllByBookmarkId(bookmarkId: string): Promise<Tag[]>;
  add(name: string, bookmarkId: string): Promise<boolean>;
  update(tagId: string, name: string): Promise<boolean>;
  delete(tagId: string): Promise<boolean>;
}
