package com.ynov.order.service;

import com.ynov.order.grpc.ProductByIdRequest;
import com.ynov.order.grpc.ProductResponse;
import com.ynov.order.grpc.ProductServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceClient {

    private final ManagedChannel channel;

    public ProductServiceClient() {
        // Assuming the Product Service gRPC server is running on localhost and listening on port 6565
        this.channel = ManagedChannelBuilder.forAddress("localhost", 6565)
                .usePlaintext()
                .build();
    }

    public ProductResponse getProductById(String productId) {
        ProductServiceGrpc.ProductServiceBlockingStub stub = ProductServiceGrpc.newBlockingStub(channel);
        ProductByIdRequest request = ProductByIdRequest.newBuilder().setProductId(productId).build();
        return stub.getProductById(request);
    }

    @PreDestroy
    public void onShutdown() {
        if (channel != null && !channel.isShutdown()) {
            channel.shutdown(); // Shut down the channel to release resources
        }
    }
}
