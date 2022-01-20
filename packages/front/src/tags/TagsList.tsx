import { DataGrid } from 'devextreme-react';
import { Button, Column, Pager, Paging } from 'devextreme-react/data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../common/Loading';
import { Tag, useTagsByBookmarkId, useDeleteTag, useUpdateTag } from './TagsApi';

export const TagsList = ({ bookmarkId }: { bookmarkId: string }) => {
  const { t } = useTranslation();
  const { isLoading, error, data: tags } = useTagsByBookmarkId(bookmarkId);
  const {
    mutate: deleteTag,
    isLoading: deleteLoading,
    error: deleteError,
  } = useDeleteTag(bookmarkId);
  const { mutate: updateTag } = useUpdateTag(bookmarkId);

  if (isLoading || deleteLoading) return <Loading />;
  if (error || deleteError) {
    console.log({ error });
  }

  return (
    <DataGrid dataSource={tags} keyExpr="id">
      <Column dataField="name" caption={t('name')} dataType="string" />
      <Column caption={t('actions')} type="buttons">
        <Button
          name="deleteBookmark"
          text={t('delete')}
          onClick={({ row: { data } }: { row: { data: Tag } }) => {
            deleteTag(data.id);
          }}
        />
      </Column>
      <Paging defaultPageSize={5} />
      <Pager showPageSizeSelector allowedPageSizes={10} />
    </DataGrid>
  );
};
