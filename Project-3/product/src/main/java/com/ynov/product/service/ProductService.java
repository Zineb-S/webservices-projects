package com.ynov.product.service;

import com.ynov.product.dto.OrderEvent;
import com.ynov.product.entity.Product;
import com.ynov.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Additional methods to handle product logic

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
    @Transactional
    public boolean checkAndUpdateProductAvailability(Long productId, int quantity) {
        Product product = productRepository.findById(productId).orElse(null);

        if (product != null && product.getQuantity() >= quantity) {
            product.setQuantity(product.getQuantity() - quantity);
            productRepository.save(product);
            return true;
        }

        return false;
    }
    public boolean processOrderEvent(OrderEvent orderEvent) {
        // Assuming OrderEvent contains productId and quantity
        return checkAndUpdateProductAvailability(orderEvent.getProductId(), orderEvent.getQuantity());
    }
}