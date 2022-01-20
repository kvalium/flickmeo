import {
  Bookmark,
  BookmarkRepositoryInterface,
  BookmarkServiceInterface,
  LinkInfoServiceInterface,
} from '../domain';

export class BookmarkService implements BookmarkServiceInterface {
  constructor(
    private readonly bookmarkRepository: BookmarkRepositoryInterface,
    private readonly linkInfoService: LinkInfoServiceInterface
  ) {}

  update = (bookmark: Bookmark): Promise<boolean> => this.bookmarkRepository.update(bookmark);
  getAll = (): Promise<Bookmark[]> => this.bookmarkRepository.getAll();
  delete = (bookmarkId: string): Promise<boolean> => this.bookmarkRepository.delete(bookmarkId);

  addFromLink = async (link: string): Promise<boolean> => {
    const bookmarkFromLink = await this.linkInfoService.getLinkInfo(link);
    return this.bookmarkRepository.add(bookmarkFromLink);
  };
}
