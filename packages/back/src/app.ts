import cors from 'cors';
import express from 'express';
import { BookmarksController, tagsRouter } from './controllers';
import { BookmarkDummyRepository } from './repositories/BookmarkDummyRepository';
import { BookmarkService } from './services/BookmarkService';
import { OEmbedService } from './services/OEmbedService';
import bodyParser from 'body-parser';

export const app = express();

const dummyBookmarkRepository = new BookmarkDummyRepository();
const oEmbedService = new OEmbedService();
const bookmarkService = new BookmarkService(dummyBookmarkRepository, oEmbedService);
const bookmarkController = new BookmarksController(bookmarkService);

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

app.use('/bookmarks', bookmarkController.getRouter());
app.use('/tags', tagsRouter);
