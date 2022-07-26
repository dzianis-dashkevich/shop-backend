import * as Joi from 'joi';
import { ProductRepository } from '@services//productService';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { Product } from '@models/product';

const productSchema = Joi.object<Product>({
    description: Joi.string(),
    price: Joi.number().required(),
    title: Joi.string().required(),
    count: Joi.number().required(),
});

export default (productRepository: ProductRepository) => async (event: APIGatewayProxyEvent) => {
    console.log('Incoming request: ', event);

    let rawProduct: unknown;

    try {
        rawProduct = JSON.parse(event.body);
    } catch (e) {
        rawProduct = {};
    }

    const { error, value } = productSchema.validate(rawProduct);

    if (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'invalid product schema' }),
        };
    }

    try {
        const product = await productRepository.createProduct(value);

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



