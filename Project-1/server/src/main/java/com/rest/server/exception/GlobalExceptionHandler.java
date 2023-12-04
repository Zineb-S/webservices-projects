package com.rest.server.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private MessageSource messageSource;

    // Helper method to get localized message
    private String getLocalizedMessage(String messageKey, HttpServletRequest request) {
        Locale locale = request.getLocale();
        return messageSource.getMessage(messageKey, null, locale);
    }

    // Handle invalid URL parameters
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleInvalidArguments(MethodArgumentNotValidException ex) {
        return new ResponseEntity<>("Invalid input parameters: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity
                .badRequest()
                .body(ex.getMessage());
    }
    // Handle resource not found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFound(ResourceNotFoundException ex , HttpServletRequest request) {
        String errorMessage = getLocalizedMessage("error.invalidParameters", request);

        return new ResponseEntity<>(errorMessage+ ex.getMessage(), HttpStatus.NOT_FOUND);
    }


    // Handle invalid path
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<String> handlePathNotFound(NoHandlerFoundException ex) {
        return new ResponseEntity<>("Path not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Handle generic server errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleServerError(Exception ex) {
        return new ResponseEntity<>("Server error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

     /* @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "PATH_NOT_FOUND");
        body.put("message", "The requested path is not valid: " + ex.getRequestURL());
        body.put("path", ex.getRequestURL());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }*/

}