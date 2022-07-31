import { ProductRepository } from '@services//productService';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { buildServerErrorResponse, buildSuccessResponse } from '@libs/handler';

export default (productRepository: ProductRepository, logger: Console) => async (event: APIGatewayProxyEvent) => {
    logger.log('Incoming request: ', event);

    try {
        const productList = await productRepository.getProducts();

        return buildSuccessResponse(productList);
    } catch (e) {
        return buildServerErrorResponse({ error: 'unexpected error during database query execution' });
    }
};

