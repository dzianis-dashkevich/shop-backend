import { ImportRepository } from '@services/importService';
import { S3Event } from 'aws-lambda';
import { buildServerErrorResponse, buildSuccessResponse } from '@libs/handler';

export default (importRepository: ImportRepository, logger: Console) => async (event: S3Event) => {
    logger.log('received event: ', event);

    try {
        await Promise.all(event.Records
            .map((record) => importRepository.parseAndMoveUploadedCsv(record.s3.object.key))
        );

        return buildSuccessResponse({ success: true });
    } catch (e) {
        logger.error('Failed during file processing: ', e);

        return buildServerErrorResponse({ error: 'failed to parse and move csv file.' });
    }
};
