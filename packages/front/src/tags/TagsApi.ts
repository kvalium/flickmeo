import { useTranslation } from 'react-i18next';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from 'react-query';

export type Tag = {
  id: string;
  name: string;
  bookmarkId: string;
  update?: string;
  remove?: string;
};

const TAGS_QUERY_KEY = 'tags';

export let tags: Tag[] = [
  {
    id: '1',
    name: 'cats',
    bookmarkId: '1',
  },
  {
    id: '2',
    name: 'japanese food',
    bookmarkId: '1',
  },
  {
    id: '3',
    name: 'diy',
    bookmarkId: '1',
  },
  {
    id: '4',
    name: 'gardening',
    bookmarkId: '3',
  },
];

export const useBookmarkTags = (bookmarkId: string) =>
  useQuery<Tag[]>([TAGS_QUERY_KEY, bookmarkId], () =>
    Promise.resolve(tags.filter((t) => t.bookmarkId === bookmarkId))
  );

export const useSaveTag = (bookmarkId: string) => {
  const client = useQueryClient();
  const { t } = useTranslation();
  // const url = `${apiUrl}/secure/v1/affectations/save/${tagType}`;
  return useMutation(
    (tagName: string) => {
      tags = [...tags, { id: '9', name: tagName, bookmarkId }];
      return Promise.resolve({ sucess: true });
    },
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

export const useUpdateBookmarkKeyword = (): UseMutationResult<unknown, unknown, Tag, unknown> => {
  const client = useQueryClient();
  const { t } = useTranslation();
  // const url = `${apiUrl}/secues/${tagType}`;
  return useMutation(
    (tag: Tag) => {
      return Promise.resolve([...tags, tag]);
    },
    {
      onSuccess: () => {
        client.invalidateQueries([TAGS_QUERY_KEY]);
      },
      onError: () => {
        console.error(t('Error while updating this bookmark tag'));
      },
    }
  );
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (tagId: string) => {
      tags = tags.filter((t) => t.id !== tagId);
      return Promise.resolve({ sucess: true });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TAGS_QUERY_KEY]);
      },
    }
  );
};
