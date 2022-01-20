import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export type Tag = {
  id: string;
  name: string;
  bookmarkId: string;
  update?: string;
  remove?: string;
};

const TAGS_QUERY_KEY = 'tags';
const BACKEND_API = 'http://localhost:8999/tags';

export const useTagsByBookmarkId = (bookmarkId: string) =>
  useQuery<Tag[]>([TAGS_QUERY_KEY, bookmarkId], () =>
    axios.get(`${BACKEND_API}/${bookmarkId}`).then(({ data: { payload } }) => payload)
  );

export const useSaveTag = (bookmarkId: string) => {
  const client = useQueryClient();
  const { t } = useTranslation();

  return useMutation(
    (name: string) =>
      axios.post(BACKEND_API, { name, bookmarkId }).then(({ data: { success } }) => success),
    {
      onSuccess: () => {
        client.invalidateQueries([TAGS_QUERY_KEY, bookmarkId]);
      },
      onError: () => {
        console.error(t('Error while saving tag affectation'));
      },
    }
  );
};

export const useUpdateTag = (bookmarkId: string) => {
  const client = useQueryClient();
  const { t } = useTranslation();

  return useMutation(
    (payload: { tagId: string; name: string }) =>
      axios.put(BACKEND_API, payload).then(({ data: { success } }) => success),
    {
      onSuccess: () => {
        client.invalidateQueries([TAGS_QUERY_KEY, bookmarkId]);
      },
      onError: () => {
        console.error(t('Error while updating this bookmark tag'));
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
