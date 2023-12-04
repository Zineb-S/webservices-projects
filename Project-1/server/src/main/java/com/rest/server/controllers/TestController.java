package com.rest.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {
    @Autowired
    private MessageSource messageSource;

    @GetMapping("/server-error")
    public ResponseEntity<String> triggerServerError() {
        throw new RuntimeException("Something is wrong with server , try again later");
    }


    @GetMapping("/greeting")
    public String getGreeting(Locale locale) {
        return messageSource.getMessage("greeting", null, locale);
    }

    @GetMapping("/currentDate")
    public String getCurrentDate(Locale locale) {
        String dateFormat = messageSource.getMessage("date.format", null, locale);
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        return formatter.format(new Date());
    }
}
