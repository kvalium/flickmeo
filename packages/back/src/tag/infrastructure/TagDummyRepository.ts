import { v4 } from 'uuid';
import { Tag, TagRepositoryInterface } from '../domain';

export class TagDummyRepository implements TagRepositoryInterface {
  tags: Tag[];
  bookmarkTags: Record<string, string[]>;

  constructor() {
    this.tags = [];
    this.bookmarkTags = {};
  }

  getAll = () => Promise.resolve(this.tags);

  getAllByBookmarkId = (bookmarkId: string): Promise<Tag[]> =>
    Promise.resolve(this.getTagsByBookmarkId(bookmarkId));

  private getTagsByBookmarkId = (bookmarkId: string) =>
    this.tags.filter((t) => (this.bookmarkTags[bookmarkId] || []).includes(t.id));

  add = (name: string, bookmarkId: string): Promise<boolean> => {
    const tagId = v4();
    this.tags.push({ id: tagId, name });
    this.bookmarkTags[bookmarkId] = [...(this.bookmarkTags[bookmarkId] || []), tagId];
    return Promise.resolve(true);
  };

  update = (tagId: string, name: string): Promise<boolean> => {
    const TagIndex = this.tags.findIndex((b) => b.id === tagId);
    this.tags[TagIndex].name = name;
    return Promise.resolve(true);
  };

  delete = (tagId: string): Promise<boolean> => {
    this.tags = this.tags.filter((b) => b.id !== tagId);

    for (const bookmarkId of Object.keys(this.bookmarkTags)) {
      this.bookmarkTags[bookmarkId] = this.bookmarkTags[bookmarkId].filter((tId) => tId !== tagId);
    }

    return Promise.resolve(true);
  };
}
