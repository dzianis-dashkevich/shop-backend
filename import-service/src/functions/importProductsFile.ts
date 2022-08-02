import { APIGatewayProxyEvent } from 'aws-lambda';
import { ImportRepository } from '@services/importService';
import { buildInvalidRequestResponse, buildServerErrorResponse, buildSuccessResponse } from '../lib/handler';

export default (importRepository: ImportRepository, logger: Console) => async (event: APIGatewayProxyEvent) => {
    logger.log('received event: ', event);

    try {
        const { name } = event.queryStringParameters;

        if (!name) {
            return buildInvalidRequestResponse({ error: 'invalid folder name provided' });
        }

        const url = await importRepository.getFolderSignedUrl(name);

        return buildSuccessResponse({ url });
    } catch (e) {
        return buildServerErrorResponse({ error: 'failed to generate signed url' });
    }
};
