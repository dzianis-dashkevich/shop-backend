import { APIGatewayProxyEvent } from 'aws-lambda';
import getProductByIdFactory from '@functions/getProductById';
import { instance, mock, when } from 'ts-mockito';
import { ProductRepository } from '@services/productService';

describe('getProductById spec', () => {
    const mockProductRepository = mock<ProductRepository>();
    const getProductById = getProductByIdFactory(instance(mockProductRepository));

    it('should return product by provided id', async () => {
        const mockProduct = {
            description: 'A strong feeling of annoyance, displeasure, or hostility.',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
            price: 24,
            title: 'Anger',
            count: 10,
        };

        when(mockProductRepository.getProductById(mockProduct.id)).thenResolve(mockProduct);

        const event = {
            pathParameters: { productId: mockProduct.id },
        } as unknown as APIGatewayProxyEvent;

        const actual = await getProductById(event);

        expect(actual).toEqual({
            body: JSON.stringify(mockProduct),
            statusCode: 200,
        });
    });
});
