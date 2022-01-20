/* eslint-disable @typescript-eslint/no-var-requires */
const serverless = require('serverless-http');
import { app } from './app';

module.exports.handler = async (event: any, context: any) => serverless(app)(event, context);
