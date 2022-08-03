import { APIGatewayProxyEvent } from 'aws-lambda';
import importProductsFileFunctionFactory from '@functions/importProductsFile';
import { instance, mock, when } from 'ts-mockito';
import { ImportRepository } from '@services/importService';
import { buildSuccessResponse } from '@libs/handler';

describe('importProductsFile spec', () => {
    const mockImportRepository = mock<ImportRepository>();
    const mockLogger = mock<Console>();
    const importProductFile = importProductsFileFunctionFactory(instance(mockImportRepository), instance(mockLogger));

    it('should return signedUrl for provided file', async () => {
        const fileName = 'products.csv';
        const mockSignedUrl = 'signeedUrl';

        when(mockImportRepository.createSignedUrlForFile(fileName)).thenResolve(mockSignedUrl);

        const event = { queryStringParameters: { name: fileName } } as unknown as APIGatewayProxyEvent;

        const actual = await importProductFile(event);

        expect(actual).toEqual(buildSuccessResponse({ url: mockSignedUrl }));
    });
});
