package com.rest.server.controllers;

import com.rest.server.models.LoginDto;
import com.rest.server.models.User;
import com.rest.server.repositories.UserRepository;
import com.rest.server.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {

        Optional<User> userOptional = userRepository.findByUserEmail(loginDto.getUserEmail());

        if (userOptional.isPresent() && passwordEncoder.matches(loginDto.getUserPassword(), userOptional.get().getUserPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("userId", userOptional.get().getUserId());
            response.put("message", "User authenticated successfully");

            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

}