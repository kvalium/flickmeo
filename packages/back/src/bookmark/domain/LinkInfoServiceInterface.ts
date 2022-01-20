import { Bookmark } from './Bookmark';

export interface LinkInfoServiceInterface {
  getLinkInfo(link: string): Promise<Bookmark>;
}
