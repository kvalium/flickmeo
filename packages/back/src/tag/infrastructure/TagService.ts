import { Tag, TagRepositoryInterface, TagServiceInterface } from '../domain';

export class TagService implements TagServiceInterface {
  constructor(private readonly tagRepository: TagRepositoryInterface) {}

  getAllByBookmarkId = (bookmarkId: string): Promise<Tag[]> =>
    this.tagRepository.getAllByBookmarkId(bookmarkId);

  add = (name: string, bookmarkId: string): Promise<boolean> =>
    this.tagRepository.add(name, bookmarkId);

  update = (tag: Tag): Promise<boolean> => this.tagRepository.update(tag);
  delete = (tagId: string): Promise<boolean> => this.tagRepository.delete(tagId);
}
