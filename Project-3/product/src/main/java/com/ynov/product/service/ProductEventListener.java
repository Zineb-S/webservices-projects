package com.ynov.product.service;

        import com.ynov.product.configuration.RabbitMQConfig;
        import com.ynov.product.dto.OrderEvent;
        import com.ynov.product.dto.ProductEvent;
        import com.ynov.product.util.JsonUtils;
        import org.springframework.amqp.rabbit.annotation.RabbitListener;
        import org.springframework.amqp.rabbit.core.RabbitTemplate;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

@Service
public class ProductEventListener {

    @Autowired
    private ProductService productService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RabbitListener(queues = RabbitMQConfig.ORDER_QUEUE_NAME)
    public void handleOrderEvent(String orderEventJson) {
        OrderEvent orderEvent = JsonUtils.convertFromJson(orderEventJson, OrderEvent.class);
        processOrderEvent(orderEvent);
    }

    private void processOrderEvent(OrderEvent orderEvent) {
        boolean isAvailable = productService.checkAndUpdateProductAvailability(
                orderEvent.getProductId(), orderEvent.getQuantity());

        ProductEvent productEvent = new ProductEvent();
        productEvent.setProductId(orderEvent.getProductId());
        productEvent.setStatus(isAvailable ? ProductEvent.Status.AVAILABLE : ProductEvent.Status.OUT_OF_STOCK);

        String productEventJson = JsonUtils.convertToJson(productEvent);
        rabbitTemplate.convertAndSend(RabbitMQConfig.PRODUCT_EXCHANGE_NAME, RabbitMQConfig.PRODUCT_ROUTING_KEY, productEventJson);
    }
}
