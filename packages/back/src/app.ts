import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {
  InMemoryBookmarkRepository as InMemoryBookmarkRepository,
  BookmarksController as BookmarkController,
  BookmarkService,
  OEmbedService,
} from './bookmark';
import { TagController, InMemoryTagRepository, TagService } from './tag';

export const app = express();

const inMemoryBookmarkRepository = new InMemoryBookmarkRepository();
const oEmbedService = new OEmbedService();
const bookmarkService = new BookmarkService(inMemoryBookmarkRepository, oEmbedService);
const bookmarkController = new BookmarkController(bookmarkService);

const inMemoryTagRepository = new InMemoryTagRepository();
const tagService = new TagService(inMemoryTagRepository);
const tagController = new TagController(tagService);

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

app.use('/bookmarks', bookmarkController.getRouter());
app.use('/tags', tagController.getRouter());
