import { Bookmark, BookmarkRepositoryInterface } from '../domain';

export class InMemoryBookmarkRepository implements BookmarkRepositoryInterface {
  bookmarks: Bookmark[];

  constructor() {
    this.bookmarks = [];
  }

  getAll = (): Promise<Bookmark[]> => Promise.resolve(this.bookmarks);

  add = (bookmark: Bookmark): Promise<boolean> => {
    this.bookmarks.push(bookmark);
    return Promise.resolve(true);
  };

  update = (bookmark: Bookmark): Promise<boolean> => {
    const bookmarkIndex = this.bookmarks.findIndex((b) => b.id === bookmark.id);
    this.bookmarks[bookmarkIndex] = bookmark;
    return Promise.resolve(true);
  };

  delete = (bookmarkId: string): Promise<boolean> => {
    this.bookmarks = this.bookmarks.filter((b) => b.id !== bookmarkId);
    return Promise.resolve(true);
  };
}
