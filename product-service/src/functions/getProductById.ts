import { ProductRepository } from '@services//productService';
import { APIGatewayProxyEvent } from 'aws-lambda';

export default (productRepository: ProductRepository) => async (event: APIGatewayProxyEvent) => {
    console.log('Incoming request: ', event);

    const { productId } = event.pathParameters;

    if (!productId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'invalid productId' }),
        };
    }

    try {
        const product = await productRepository.getProductById(productId);

        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'product not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(product),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'unexpected error during database query execution' }),
        };
    }
};

