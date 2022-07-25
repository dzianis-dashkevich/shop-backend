import createProductFunction from '@functions/handler';

const getProductById = createProductFunction({
    getQueryString: (event) => `
            SELECT product.*, stocks.count
            FROM product
            JOIN stocks on product.id = stocks.product_id
            WHERE id = '${event.pathParameters?.productId}'
        `,
    getApiGatewayProxyResult: (productsList) => {
        if (!productsList.length) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'product not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(productsList[0]),
        };
    },
});

export default getProductById;

