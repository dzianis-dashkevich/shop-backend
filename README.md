
## Front-end:
https://cloud-x-training.dzianis-dashkevich.com

## Services

### product-service

- Stages:
  - dev: 
    - service: https://cloud-x-training-dev-api.dzianis-dashkevich.com/product-service
    - cors (allowed origin): http://localhost:3000
  - prod: 
    - service: https://cloud-x-training-api.dzianis-dashkevich.com/product-service
    - cors (allowed origin): https://cloud-x-training.dzianis-dashkevich.com
- Endpoints:
  - Get All Products: `/products`
  - Get Product By Id: `/products/{productId}`
    - Valid `productId` example: `7567ec4b-b10c-48c5-9345-fc73c48a80aa`
