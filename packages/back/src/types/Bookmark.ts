export type Bookmark = {
  id: string;
  type: 'video' | 'photo';
  providerName: string;
  title: string;
  author: string;
  width: number;
  height: number;
  addedDate?: string;
  duration?: number;
};
