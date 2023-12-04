package com.ynov.order.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ynov.order.configuration.RabbitMQConfig;
import com.ynov.order.entity.Order;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderMessageSender {

    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public OrderMessageSender(RabbitTemplate rabbitTemplate ,ObjectMapper objectMapper) {
        this.rabbitTemplate = rabbitTemplate;
        this.objectMapper = objectMapper;
    }

    public void sendOrderEvent(Order order) {
        // Convert your order to a message. You might need to transform it to a DTO or JSON.
        // For instance, using JSON:
        String orderMessage = convertOrderToJson(order);
        rabbitTemplate.convertAndSend(RabbitMQConfig.ORDER_EXCHANGE_NAME, RabbitMQConfig.ORDER_ROUTING_KEY, orderMessage);

    }

    private String convertOrderToJson(Order order) {


        try {
            return objectMapper.writeValueAsString(order);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting order to JSON", e);
        }
    }

}
