import { APIGatewayProxyEvent } from 'aws-lambda';
import { ImportRepository } from '@services/importService';
import { buildInvalidRequestResponse, buildServerErrorResponse, buildSuccessResponse } from '@libs/handler';

export default (importRepository: ImportRepository, logger: Console) => async (event: APIGatewayProxyEvent) => {
    logger.log('received event: ', event);

    try {
        const { name } = event.queryStringParameters;

        if (!name) {
            return buildInvalidRequestResponse({ error: 'invalid file name is provided' });
        }

        const url = await importRepository.createSignedUrlForFile(name);

        return buildSuccessResponse({ url });
    } catch (e) {
        return buildServerErrorResponse({ error: 'failed to generate signed url' });
    }
};
