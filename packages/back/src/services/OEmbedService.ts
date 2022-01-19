import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';
import { Bookmark } from '../types/Bookmark';
import { OEmbedError, OEmbedResult } from '../types/OEmbedResult';
import { oEmbedProviders } from '../utils/oEmbedProviders';
import { LinkInfoServiceInterface } from './LinkInfoServiceInterface';

export class OEmbedService implements LinkInfoServiceInterface {
  getLinkInfo = async (link: string) => {
    const providerUrl = this.getProviderUrl(link);
    const oEmbedResult = await this.fetchOembed(providerUrl, link);
    return this.mapToNewBookmark(oEmbedResult);
  };

  private getProviderUrl = (link: string) => {
    for (const providerKey in oEmbedProviders) {
      if (link.toLowerCase().includes(providerKey)) {
        return oEmbedProviders[providerKey].url;
      }
    }
    throw new Error(`unable to find a provider for given url: "${link}"`);
  };

  private fetchOembed = async (providerUrl: string, link: string): Promise<OEmbedResult> => {
    const fetchJSONResult = await fetch(`${providerUrl}/?url=${link}&format=json`);
    const result = await fetchJSONResult.json();
    if (this.isOembedError(result)) {
      throw new Error(result.error);
    }
    if (!this.isOembedResult(result)) {
      throw new Error('something went wrong');
    }
    return result;
  };

  private isOembedError = (r: unknown): r is OEmbedError => (r as OEmbedError).error !== undefined;
  private isOembedResult = (r: unknown): r is OEmbedResult =>
    (r as OEmbedResult).provider_name !== undefined;

  private mapToNewBookmark = (r: OEmbedResult): Bookmark => ({
    id: uuid(),
    height: r.height,
    title: r.title,
    type: r.type,
    width: r.width,
    duration: r?.duration,
    author: r.author_name,
    providerName: r.provider_name,
    addedDate: r?.upload_date,
  });
}
