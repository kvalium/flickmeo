import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export type Tag = {
  id: string;
  name: string;
  bookmarkId: string;
  update?: string;
  remove?: string;
};

const TAGS_QUERY_KEY = 'tags';
const BACKEND_API = `${import.meta.env.VITE_BACKEND_URL}/tags`;

export const useTagsByBookmarkId = (bookmarkId: string) =>
  useQuery<Tag[]>([TAGS_QUERY_KEY, bookmarkId], () =>
    axios.get(`${BACKEND_API}/${bookmarkId}`).then(({ data: { payload } }) => payload)
  );

export const useSaveTag = (bookmarkId: string) => {
  const client = useQueryClient();

  return useMutation(
    (name: string) =>
      axios.post(BACKEND_API, { name, bookmarkId }).then(({ data: { success } }) => success),
    {
      onSuccess: () => {
        client.invalidateQueries([TAGS_QUERY_KEY, bookmarkId]);
      },
    }
  );
};

export const useUpdateTag = (bookmarkId: string) => {
  const client = useQueryClient();

  return useMutation(
    (tag: Partial<Tag>) => axios.put(BACKEND_API, { tag }).then(({ data: { success } }) => success),
    {
      onSuccess: () => {
        client.invalidateQueries([TAGS_QUERY_KEY, bookmarkId]);
      },
    }
  );
};

export const useDeleteTag = (bookmarkId: string) => {
  const client = useQueryClient();

  return useMutation(
    (id: string) => axios.delete(`${BACKEND_API}/${id}`).then(({ data: { success } }) => success),
    {
      onSuccess: () => {
        client.invalidateQueries([TAGS_QUERY_KEY, bookmarkId]);
      },
    }
  );
};
