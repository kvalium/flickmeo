import { DataGrid } from 'devextreme-react';
import { Button, Column, Pager, Paging } from 'devextreme-react/data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../common/Loading';
import { Toast } from '../common/Toast';
import { Tag, useTagsByBookmarkId, useDeleteTag, useUpdateTag } from './TagsApi';

export const TagsList = ({ bookmarkId }: { bookmarkId: string }) => {
  const { t } = useTranslation();
  const { isLoading, isError, data: tags } = useTagsByBookmarkId(bookmarkId);
  const {
    mutate: deleteTag,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useDeleteTag(bookmarkId);
  const {
    mutate: updateTag,
    isLoading: updateLoading,
    isError: updateError,
  } = useUpdateTag(bookmarkId);

  if (isLoading || deleteLoading || updateLoading) return <Loading />;

  return (
    <>
      <Toast open={isError} type="warning" message={t('An error occurs while fetching tags')} />
      <Toast open={deleteError} type="warning" message={t('An error occurs while deleting tag')} />
      <Toast open={updateError} type="warning" message={t('An error occurs while updating tag')} />
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
    </>
  );
};
