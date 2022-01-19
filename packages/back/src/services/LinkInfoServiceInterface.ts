import { Bookmark } from '../types/Bookmark';

export interface LinkInfoServiceInterface {
  getLinkInfo(link: string): Promise<Bookmark>;
}
