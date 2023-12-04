package com.ynov.order.controller;

import com.ynov.order.dto.OrderRequest;
import com.ynov.order.entity.Order;
import com.ynov.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        if (orderRequest.getProductId() == null || orderRequest.getProductId() <= 0 ||
                orderRequest.getQuantity() == null || orderRequest.getQuantity() <= 0) {
            return ResponseEntity.badRequest().build();
        }

        Order order = orderService.createOrder(orderRequest);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
        }
    }
}
