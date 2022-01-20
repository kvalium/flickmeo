import axios from 'axios';
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
const BACKEND_API = 'http://localhost:8999/bookmarks';

export const useBookmarks = () =>
  useQuery<Bookmark[]>(BOOKMARKS_QUERY_KEY, () =>
    axios.get(BACKEND_API).then(({ data: { payload } }) => payload)
  );

export const useDeleteBookmark = () => {
  const client = useQueryClient();

  return useMutation(
    (id: string) => axios.delete(`${BACKEND_API}/${id}`).then(({ data: { success } }) => success),
    {
      onSuccess: () => {
        client.invalidateQueries(BOOKMARKS_QUERY_KEY);
      },
    }
  );
};

export const useAddBookmark = () => {
  const client = useQueryClient();

  return useMutation(
    (link: string) => axios.post(BACKEND_API, { link }).then(({ data: { success } }) => success),
    {
      onSuccess: () => {
        client.invalidateQueries(BOOKMARKS_QUERY_KEY);
      },
    }
  );
};
