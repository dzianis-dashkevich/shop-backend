import { APIGatewayProxyEvent } from 'aws-lambda';
import getProductListFactory from '@functions/getProductsList';
import { instance, mock, when } from 'ts-mockito';
import { ProductRepository } from '@services/productService';

describe('getProductById spec', () => {
    const mockProductRepository = mock<ProductRepository>();
    const getProductList = getProductListFactory(instance(mockProductRepository));

    it('should return all available products', async () => {
        const mockProductList = [{
            description: 'A strong feeling of annoyance, displeasure, or hostility.',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
            price: 24,
            title: 'Anger',
            count: 10,
        }];

        when(mockProductRepository.getProducts()).thenResolve(mockProductList);

        const actual = await getProductList({} as APIGatewayProxyEvent);

        expect(actual).toEqual({
            body: JSON.stringify(mockProductList),
            statusCode: 200,
        });
    });
});
