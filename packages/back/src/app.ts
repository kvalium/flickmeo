import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {
  BookmarkDummyRepository,
  BookmarksController as BookmarkController,
  BookmarkService,
  OEmbedService,
} from './bookmark';
import { TagController, TagDummyRepository, TagService } from './tag';

export const app = express();

const dummyBookmarkRepository = new BookmarkDummyRepository();
const oEmbedService = new OEmbedService();
const bookmarkService = new BookmarkService(dummyBookmarkRepository, oEmbedService);
const bookmarkController = new BookmarkController(bookmarkService);

const dummyTagRepository = new TagDummyRepository();
const tagService = new TagService(dummyTagRepository);
const tagController = new TagController(tagService);

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

app.use('/bookmarks', bookmarkController.getRouter());
app.use('/tags', tagController.getRouter());
