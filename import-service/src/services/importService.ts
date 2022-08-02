import { S3 } from 'aws-sdk';
import csv from 'csv-parser';

export interface ImportRepository {
  createSignedUrlForFile(fileName: string): Promise<string>;
  parseAndMoveUploadedCsv(fileName: string): Promise<void>;
}

export default class ImportService implements ImportRepository {
  private static readonly DEFAULT_EXPIRES = 60;
  private static readonly FOLDER_CONTENT_TYPE = 'text/csv';
  private static readonly ROOT_UPLOADED = 'uploaded';
  private static readonly ROOT_PARSED = 'parsed';

  // TODO: there should be abstraction instead of s3Clients
  constructor(private readonly s3Client: S3, private readonly bucket: string, private readonly logger: Console) {}

  createSignedUrlForFile(fileName: string): Promise<string> {
    return this.s3Client.getSignedUrlPromise('putObject', {
        Bucket: this.bucket,
        Key: `${ImportService.ROOT_UPLOADED}/${fileName}`,
        Expires: ImportService.DEFAULT_EXPIRES,
        ContentType: ImportService.FOLDER_CONTENT_TYPE,
    });
  }

    async parseAndMoveUploadedCsv(fileName: string): Promise<void> {
        await this.parseFile(fileName);
        await this.copyFile(fileName);
        await this.deleteFile(fileName);
    }

  private parseFile (fileName: string): Promise<void> {
      this.logger.log('start parsing file: ', fileName);

      const stream = this.s3Client.getObject({
          Bucket: this.bucket,
          Key: fileName,
      }).createReadStream().pipe(csv());

      return new Promise((resolve, reject) => {
          stream.on('error', reject);
          stream.on('data', (chunk) => this.logger.log('on file read: ', chunk));
          stream.on('end', resolve);
      });
  }

  private async copyFile (fileName: string): Promise<void> {
      await this.s3Client.copyObject({
              Bucket: this.bucket,
              CopySource: `${this.bucket}/${fileName}`,
              Key: fileName.replace(ImportService.ROOT_UPLOADED, ImportService.ROOT_PARSED),
          }).promise();

      this.logger.log(`copy file:  ${fileName} was successful`);
  }

  private async deleteFile (fileName: string): Promise<void> {
      await this.s3Client.deleteObject({
          Bucket: this.bucket,
          Key: fileName,
      }).promise();

      this.logger.log(`${fileName} was deleted.`);
  }
}
