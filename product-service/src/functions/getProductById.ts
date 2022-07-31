import { ProductRepository } from '@services//productService';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
    buildInvalidRequestResponse,
    buildNotFoundResponse,
    buildServerErrorResponse,
    buildSuccessResponse,
} from '@libs/handler';

export default (productRepository: ProductRepository, logger: Console) => async (event: APIGatewayProxyEvent) => {
    logger.log('Incoming request: ', event);

    const { productId } = event.pathParameters;

    if (!productId) {
        return buildInvalidRequestResponse({ error: 'invalid product id provided' });

    }

    try {
        const product = await productRepository.getProductById(productId);

        if (!product) {
            return buildNotFoundResponse({ error: 'product not found' });
        }

        return buildSuccessResponse(product);
    } catch (e) {
        return buildServerErrorResponse({ error: 'unexpected error during database query execution' });
    }
};

