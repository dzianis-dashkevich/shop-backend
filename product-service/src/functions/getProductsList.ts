import createProductFunction from '@functions/handler';

const getProductsList = createProductFunction({
    getQueryString: () => `
            SELECT product.*, stocks.count
            FROM product
            JOIN stocks on product.id = stocks.product_id
        `,
    getApiGatewayProxyResult: (productsList) => ({
        statusCode: 200,
        body: JSON.stringify(productsList),
    }),
});

export default getProductsList;

