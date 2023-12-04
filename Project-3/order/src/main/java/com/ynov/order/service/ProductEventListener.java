package com.ynov.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ynov.order.dto.ProductEvent;
import com.ynov.order.entity.Order;
import com.ynov.order.repository.OrderRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ynov.order.configuration.RabbitMQConfig;
import java.util.List;

@Service
public class ProductEventListener {

    @Autowired
    private OrderRepository orderRepository; // Your repository for accessing orders
    private final ObjectMapper objectMapper;

    public ProductEventListener(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @RabbitListener(queues = RabbitMQConfig.PRODUCT_QUEUE_NAME)
    public void handleProductEvent(String productEventJson) {
        ProductEvent productEvent = convertJsonToProductEvent(productEventJson);
        processProductEvent(productEvent);
    }

    private void processProductEvent(ProductEvent productEvent) {
        List<Order> orders = orderRepository.findByProductId(productEvent.getProductId());
        for (Order order : orders) {
            if (productEvent.getStatus() == ProductEvent.Status.AVAILABLE) {
                order.setStatus(Order.OrderStatus.PROCESSING);
            } else if (productEvent.getStatus() == ProductEvent.Status.OUT_OF_STOCK) {
                order.setStatus(Order.OrderStatus.FAILED);
            }
            orderRepository.save(order);
        }
    }

    private ProductEvent convertJsonToProductEvent(String json) {
        try {

            return objectMapper.readValue(json, ProductEvent.class);
        } catch (Exception e) {
            throw new RuntimeException("Error converting JSON to ProductEvent", e);
        }
    }
}
