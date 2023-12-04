package com.ynov.order.configuration;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class RabbitMQConfig {
    public static final String ORDER_QUEUE_NAME = "order-queue";
    public static final String PRODUCT_QUEUE_NAME = "product-queue";
    public static final String ORDER_EXCHANGE_NAME = "order-exchange";
    public static final String PRODUCT_EXCHANGE_NAME = "product-exchange";
    public static final String ORDER_ROUTING_KEY = "order-routing";
    public static final String PRODUCT_ROUTING_KEY = "product-routing";

    @Bean
    Queue orderQueue() {
        return new Queue(ORDER_QUEUE_NAME, true);
    }

    @Bean
    Queue productQueue() {
        return new Queue(PRODUCT_QUEUE_NAME, true);
    }

    @Bean
    DirectExchange orderExchange() {
        return new DirectExchange(ORDER_EXCHANGE_NAME);
    }

    @Bean
    DirectExchange productExchange() {
        return new DirectExchange(PRODUCT_EXCHANGE_NAME);
    }

    @Bean
    Binding bindingOrderQueue(Queue orderQueue, DirectExchange orderExchange) {
        return BindingBuilder.bind(orderQueue).to(orderExchange).with(ORDER_ROUTING_KEY);
    }

    @Bean
    Binding bindingProductQueue(Queue productQueue, DirectExchange productExchange) {
        return BindingBuilder.bind(productQueue).to(productExchange).with(PRODUCT_ROUTING_KEY);
    }
}
