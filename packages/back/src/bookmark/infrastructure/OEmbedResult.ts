export type OEmbedResult = {
  type: 'video' | 'photo';
  provider_name: string;
  title: string;
  author_name: string;
  width: number;
  height: number;
  upload_date: string;
  duration?: number;
};

export type OEmbedError = {
  id: string;
  error: string;
  link: string | null;
  developer_message: string;
  error_code: number;
};
