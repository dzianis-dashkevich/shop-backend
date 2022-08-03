import { S3 } from 'aws-sdk';
import ImportService from '@services/importService';

import importProductsFileFunctionFactory from './importProductsFile';
import importFileParserFunctionFactory from './importFileParser';

const { S3_REGION, S3_IMPORT_BUCKET_NAME } = process.env;

const s3Client = new S3({ region: S3_REGION });

const importService = new ImportService(s3Client, S3_IMPORT_BUCKET_NAME, console);

export const importProductsFile = importProductsFileFunctionFactory(importService, console);
export const importFileParser = importFileParserFunctionFactory(importService, console);
