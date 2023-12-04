package com.ynov.product.configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.ynov.product.entity.Product;
import com.ynov.product.repository.ProductRepository;

import java.math.BigDecimal;

@Configuration
public class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            repository.save(new Product("Product Name", "Description", new BigDecimal("19.99"), 100));
            // Make sure the "Product Name" is not null
        };
    }

}
