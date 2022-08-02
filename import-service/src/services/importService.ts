import { S3 } from 'aws-sdk';

export interface ImportRepository {
  getCatalogSignedUrl(catalogName: string): Promise<string>;
}

export default class ImportService implements ImportRepository {
  private static readonly DEFAULT_EXPIRES = 60;
  private static readonly CATALOG_CONTENT_TYPE = 'text/csv';
  private static readonly ROOT_UPLOADED = 'uploaded';

  // TODO: there should be abstraction instead of s3Clients
  constructor(private readonly s3Client: S3, private readonly bucket: string) {}

  getCatalogSignedUrl(catalogName: string): Promise<string> {
    const params = {
      Bucket: this.bucket,
      Key: `${ImportService.ROOT_UPLOADED}/${catalogName}`,
      Expires: ImportService.DEFAULT_EXPIRES,
      ContentType: ImportService.CATALOG_CONTENT_TYPE,
    };

    return this.s3Client.getSignedUrlPromise('putObject', params);
  }
}
