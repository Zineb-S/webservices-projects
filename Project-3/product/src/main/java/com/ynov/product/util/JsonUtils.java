package com.ynov.product.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String convertToJson(Object obj) {
        objectMapper.registerModule(new JavaTimeModule());
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting to JSON", e);
        }
    }

    public static <T> T convertFromJson(String json, Class<T> clazz) {
        objectMapper.registerModule(new JavaTimeModule());
        try {
            return objectMapper.readValue(json, clazz);
        } catch (JsonMappingException e) {
            throw new RuntimeException("Error mapping JSON to Object", e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}