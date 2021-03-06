import { Link } from '@mui/material';
import { DataGrid } from 'devextreme-react';
import {
  Button as DatagridButton,
  Column,
  Editing,
  FilterRow,
  Pager,
  Paging,
} from 'devextreme-react/data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../common/Loading';
import { Toast } from '../common/Toast';
import { Bookmark, useBookmarks, useDeleteBookmark, useUpdateBookmark } from './BookmarksApi';
import { DeleteBookmarkModal } from './DeleteBookmarkModal';
import { UpdateTagsModal } from '../tags/UpdateTagsModal';

export const BookmarksList = () => {
  const { t } = useTranslation();
  const [showUpdateModal, toggleUpdateModal] = useState(false);
  const [showDeleteModal, toggleDeleteModal] = useState(false);
  const [selectedBookmarkId, setSelectedBookmark] = useState<string>('');

  const { isLoading, isError, data: bookmarks } = useBookmarks();
  const { mutate: deleteBookmark } = useDeleteBookmark();
  const { mutate: updateBookmark } = useUpdateBookmark();

  if (isLoading) return <Loading />;

  const BookmarkUrlRender = ({ data }: { data: Bookmark }) => (
    <Link target="_blank" href={data.url}>
      {data.url}
    </Link>
  );

  return (
    <>
      <Toast
        open={isError}
        type="warning"
        message={t('An error occurs while fetching bookmarks')}
      />
      <DataGrid
        dataSource={bookmarks}
        keyExpr="id"
        rowAlternationEnabled
        onSaved={({ changes: [{ data: bookmark }] }) => updateBookmark(bookmark)}
      >
        <Column
          dataField="url"
          caption={t('url')}
          dataType="string"
          cellRender={BookmarkUrlRender}
          allowEditing={false}
        />
        <Column dataField="title" caption={t('title')} dataType="string" />
        <Column dataField="author" caption={t('author')} dataType="string" />
        <Column
          dataField="addedDate"
          caption={t('addedDate')}
          dataType="date"
          defaultSortIndex={0}
          defaultSortOrder="desc"
        />
        <Column caption={t('actions')} type="buttons">
          <DatagridButton
            name="updateTags"
            text={t('update')}
            onClick={({ row: { data } }: { row: { data: Bookmark } }) => {
              setSelectedBookmark(data.id);
              toggleUpdateModal(true);
            }}
          />
          <DatagridButton
            name="deleteBookmark"
            text={t('delete')}
            onClick={({ row: { data } }: { row: { data: Bookmark } }) => {
              setSelectedBookmark(data.id);
              toggleDeleteModal(true);
            }}
          />
        </Column>
        <Paging defaultPageSize={5} />
        <Pager showPageSizeSelector allowedPageSizes={10} />
        <FilterRow visible />
        <Editing mode="cell" allowUpdating />
      </DataGrid>

      <UpdateTagsModal
        show={showUpdateModal}
        bookmarkId={selectedBookmarkId || ''}
        onClose={() => toggleUpdateModal(false)}
      />
      <DeleteBookmarkModal
        show={showDeleteModal}
        onClose={() => toggleDeleteModal(false)}
        onConfirm={() => {
          deleteBookmark(selectedBookmarkId);
          toggleDeleteModal(false);
        }}
      />
    </>
  );
};
