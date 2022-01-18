import { DataGrid } from 'devextreme-react';
import { Button, Column, Pager, Paging } from 'devextreme-react/data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../common/Loading';
import { Tag, useBookmarkTags, useDeleteTag } from './TagsApi';

export const TagsList = ({ bookmarkId }: { bookmarkId: string }) => {
  const { t } = useTranslation();
  const { isLoading, error, data: tags } = useBookmarkTags(bookmarkId);
  const { mutate: deleteTag } = useDeleteTag();

  if (isLoading) return <Loading />;
  if (error) {
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
