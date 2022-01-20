type Providers = Record<string, { url: string }>;

export const oEmbedProviders: Providers = {
  vimeo: {
    url: 'https://vimeo.com/api/oembed.json',
  },
  flickr: {
    url: 'http://www.flickr.com/services/oembed',
  },
  youtube: {
    url: 'https://www.youtube.com/oembed',
  },
};
