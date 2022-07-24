import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import getMockProductsList from '@libs/mock-products-list';

export default async function getProductById (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (!event.pathParameters?.productId) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'product not found' }),
        };
    }

    try {
        const productList = await getMockProductsList();
        const product = productList.find(product => product.id === event.pathParameters.productId);

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
            body: JSON.stringify({ error: 'failed to parse mock data' }),
        };
    }
}

