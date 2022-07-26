import { ProductRepository } from '@services//productService';
import { APIGatewayProxyEvent } from 'aws-lambda';

export default (productRepository: ProductRepository) => async (event: APIGatewayProxyEvent) => {
    console.log('Incoming request: ', event);

    try {
        const productList = await productRepository.getProducts();

        return {
            statusCode: 200,
            body: JSON.stringify(productList),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'unexpected error during database query execution' }),
        };
    }
};

