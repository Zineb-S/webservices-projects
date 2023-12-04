package com.ynov.product.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ynov.product.configuration.RabbitMQConfig;
import com.ynov.product.dto.ProductEvent;
import com.ynov.product.util.JsonUtils;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductEventPublisher {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void publishProductEvent(ProductEvent productEvent) {
        String productEventMessage = JsonUtils.convertToJson(productEvent);
        rabbitTemplate.convertAndSend(RabbitMQConfig.PRODUCT_EXCHANGE_NAME, RabbitMQConfig.PRODUCT_ROUTING_KEY, productEventMessage);
    }
}
