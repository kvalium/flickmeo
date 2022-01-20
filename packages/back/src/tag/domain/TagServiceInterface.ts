import { Tag } from './Tag';

export interface TagServiceInterface {
  getAllByBookmarkId(bookmarkId: string): Promise<Tag[]>;
  add(name: string, bookmarkId: string): Promise<boolean>;
  update(tag: Tag): Promise<boolean>;
  delete(tagId: string): Promise<boolean>;
}
