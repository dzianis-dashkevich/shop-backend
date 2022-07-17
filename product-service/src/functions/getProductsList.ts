import { APIGatewayProxyResult } from 'aws-lambda';
import getMockProductsList from '@libs/mock-products-list';

export default async function getProductsList (): Promise<APIGatewayProxyResult> {
    try {
        const productsList = await getMockProductsList();

        return {
            statusCode: 200,
            body: JSON.stringify(productsList),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'failed to parse mock data' }),
        };
    }
}

