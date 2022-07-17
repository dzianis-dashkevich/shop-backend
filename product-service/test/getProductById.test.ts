import { APIGatewayProxyEvent } from 'aws-lambda';
import getProductById from '@functions/getProductById';

describe('getProductById spec', () => {
    it('should return product by provided id', async () => {
        const event = {
            pathParameters: {
                productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
            },
        } as unknown as APIGatewayProxyEvent;

        const actual = await getProductById(event);

        expect(actual).toEqual({
            body: JSON.stringify( {
                description: 'A strong feeling of annoyance, displeasure, or hostility.',
                id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
                price: 24,
                title: 'Anger',
            }),
            statusCode: 200,
        });
    });
});
