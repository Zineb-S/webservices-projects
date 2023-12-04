package com.ynov.product.dto;


public class ProductEvent {

    public enum Status {
        AVAILABLE, OUT_OF_STOCK
    }

    private Long productId;
    private Status status;

    // Getters and setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}