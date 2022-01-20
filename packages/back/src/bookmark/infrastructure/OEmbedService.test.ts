import { OEmbedService } from './OEmbedService';
import axios, { AxiosResponse } from 'axios';
import { OEmbedError, OEmbedResult } from './OEmbedResult';
import { Bookmark } from '../domain';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const FAKE_ID = 'FAKE_ID';

const VALID_LINK = 'https://vimeo.com/28164488';
const INVALID_LINK = 'https://imgur.com/gallery/O3EIPHp';

jest.mock('uuid', () => ({ v4: () => FAKE_ID }));

describe('OEmbed service', () => {
  it('throws when no provider found for link', async () => {
    const service = new OEmbedService();

    expect.assertions(1);
    try {
      await service.getLinkInfo(INVALID_LINK);
    } catch (e) {
      expect((e as Error).message).toMatch(
        `unable to find a provider for given url: "${INVALID_LINK}"`
      );
    }
  });

  it('throws when oEmbed fails or cannot parse', async () => {
    mockedAxios.get.mockResolvedValueOnce(setAxiosResponse({}, 404));

    const service = new OEmbedService();

    expect.assertions(1);
    try {
      await service.getLinkInfo(VALID_LINK);
    } catch (e) {
      expect((e as Error).message).toMatch(`something went wrong`);
    }
  });

  it('throws when oEmbed error response', async () => {
    const fakeError: OEmbedError = {
      developer_message: 'something went wrong',
      error: 'test fails',
      error_code: 42,
      id: '1',
      link: null,
    };

    mockedAxios.get.mockResolvedValueOnce(setAxiosResponse(fakeError));

    const service = new OEmbedService();

    expect.assertions(1);
    try {
      await service.getLinkInfo(VALID_LINK);
    } catch (e) {
      expect((e as Error).message).toMatch(fakeError.error);
    }
  });

  it('map oEmbed result to bookmark', async () => {
    const fakeOEmbedResult: OEmbedResult = {
      author_name: 'John Doe',
      height: 100,
      width: 250,
      provider_name: 'Vimeo',
      title: 'My Test Video',
      type: 'video',
      upload_date: '2020-08-25 14:35:18',
      duration: 20,
    };

    const expectedBookmark: Bookmark = {
      addedDate: '2020-08-25 14:35:18',
      url: VALID_LINK,
      author: 'John Doe',
      duration: 20,
      height: 100,
      id: 'FAKE_ID',
      providerName: 'Vimeo',
      title: 'My Test Video',
      type: 'video',
      width: 250,
    };

    mockedAxios.get.mockResolvedValueOnce(setAxiosResponse(fakeOEmbedResult));

    const service = new OEmbedService();
    const data = await service.getLinkInfo(VALID_LINK);
    expect(data).toEqual(expectedBookmark);
  });
});

const setAxiosResponse = (data: unknown, status = 200): AxiosResponse => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {},
});
