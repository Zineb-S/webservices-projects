package com.ynov.product.grpc;

import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService;

@GRpcService
public class ProductServiceImpl extends ProductServiceGrpc.ProductServiceImplBase {

    @Override
    public void getProductById(ProductByIdRequest request, StreamObserver<ProductResponse> responseObserver) {
        // Assume we have a method to get the product details
        ProductResponse response = getProductDetails(request.getProductId());

        if (response != null) {
            responseObserver.onNext(response);
        } else {
            responseObserver.onError(Status.NOT_FOUND.asRuntimeException());
        }

        responseObserver.onCompleted();
    }

    private ProductResponse getProductDetails(String productId) {
        // Here, you should interact with your database or repository to get the product details.
        // This is just a placeholder example.
        return ProductResponse.newBuilder()
                .setProductId(productId)
                .setName("Sample Product")
                .setDescription("This is just a sample")
                .setQuantity(10)
                .setPrice(19.99)
                .build();
    }
}