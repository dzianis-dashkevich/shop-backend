import getProductList from '@functions/getProductsList';
import getMockProductsList from '@libs/mock-products-list';

describe('getProductsList spec', () => {
    it('should return all available products', async () => {
        const actual = await getProductList();
        const expected = await getMockProductsList();

        expect(actual).toEqual({
            body: JSON.stringify(expected),
            statusCode: 200,
        });
    });
});
