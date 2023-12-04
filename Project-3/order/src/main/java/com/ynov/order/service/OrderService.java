package com.ynov.order.service;

import com.ynov.order.dto.OrderRequest;
import com.ynov.order.entity.Order;
import com.ynov.order.grpc.ProductResponse;
import com.ynov.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductServiceClient productGrpcClient;
    private final OrderMessageSender orderMessageSender; // Add this line

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductServiceClient productGrpcClient, OrderMessageSender orderMessageSender) {
        this.orderRepository = orderRepository;
        this.productGrpcClient = productGrpcClient;
        this.orderMessageSender = orderMessageSender; // Initialize in constructor
    }

    public Order createOrder(OrderRequest orderRequest) {
        // Use the gRPC client to get the product details
        ProductResponse productResponse = productGrpcClient.getProductById(orderRequest.getProductId().toString());

        if (productResponse != null && productResponse.getQuantity() >= orderRequest.getQuantity()) {
            Order order = new Order();
            order.setProductId(orderRequest.getProductId());
            order.setQuantity(orderRequest.getQuantity());
            order.setStatus(Order.OrderStatus.CREATED);
            order.setCreatedAt(LocalDateTime.now());

            Order savedOrder = orderRepository.save(order);

            // Send a message to RabbitMQ after saving the order
            orderMessageSender.sendOrderEvent(savedOrder);

            return savedOrder;
        }

        return null; // or throw an exception or handle the case where the product is not found or insufficient quantity
    }
}
