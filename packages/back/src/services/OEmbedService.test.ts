import { OEmbedService } from './OEmbedService';
import { OEmbedError, OEmbedResult } from '../types/OEmbedResult';
import { Bookmark } from '../types/Bookmark';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

const FAKE_ID = 'FAKE_ID';

const VALID_LINK = 'https://vimeo.com/28164488';
const INVALID_LINK = 'https://imgur.com/gallery/O3EIPHp';

jest.mock('uuid', () => ({ v4: () => FAKE_ID }));

describe('OEmbed service', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

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
    fetchMock.mockRejectOnce(new Error('404 not found'));

    const service = new OEmbedService();

    expect.assertions(1);
    try {
      await service.getLinkInfo(VALID_LINK);
    } catch (e) {
      expect((e as Error).message).toMatch(`404 not found`);
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
    fetchMock.mockResponseOnce(JSON.stringify(fakeError));

    const service = new OEmbedService();

    expect.assertions(1);
    try {
      await service.getLinkInfo(VALID_LINK);
    } catch (e) {
      expect((e as Error).message).toMatch(fakeError.error);
    }
  });

  it.only('map oEmbed result to bookmark', async () => {
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
      id: FAKE_ID,
      ...fakeOEmbedResult,
      author: fakeOEmbedResult.author_name,
      providerName: fakeOEmbedResult.provider_name,
      addedDate: fakeOEmbedResult.upload_date,
    };

    fetchMock.mockResponseOnce(JSON.stringify(fakeOEmbedResult));

    const service = new OEmbedService();
    expect(service.getLinkInfo(VALID_LINK)).resolves.toEqual(expectedBookmark);
  });
});
