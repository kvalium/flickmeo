import { useMutation, useQuery, useQueryClient } from 'react-query';

export type Bookmark = {
  id: string;
  url: string;
  title: string;
  author: string;
  dateAdded: string;
  update?: string;
  remove?: string;
};

const BOOKMARKS_QUERY_KEY = 'bookmarks';

let bookmarks: Bookmark[] = [
  {
    id: '1',
    url: 'https://vimeo.com/292532411',
    title: 'cats',
    author: 'J. Doe',
    dateAdded: '2015-08-25 14:35:19',
  },
  {
    id: '2',
    url: 'https://vimeo.com/292532412',
    title: 'cats 2',
    author: 'J. Doe',
    dateAdded: '2011-08-25 14:35:19',
  },
  {
    id: '3',
    url: 'https://vimeo.com/292532413',
    title: 'cats 3',
    author: 'J. Doe',
    dateAdded: '2011-08-25 14:35:19',
  },
];

export const useBookmarks = () =>
  useQuery<Bookmark[]>(BOOKMARKS_QUERY_KEY, () =>
    Promise.resolve([...bookmarks, ...bookmarks, ...bookmarks, ...bookmarks, ...bookmarks])
  );

export const useRetrieveLinkInfo = (link?: string) =>
  useQuery(
    ['getlink', link],
    () => fetch(`https://vimeo.com/api/oembed.json?url=${link}&format=json`).then((r) => r.json()),
    { refetchOnWindowFocus: false, enabled: !!link }
  );

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => {
      bookmarks = bookmarks.filter((b) => b.id !== id);
      return Promise.resolve({ sucess: true });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(BOOKMARKS_QUERY_KEY);
      },
    }
  );
};
