package com.rest.server.services;

import com.rest.server.models.User;
import com.rest.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public boolean authenticate(String email, String password) {
        Optional<User> userOptional = userRepository.findByUserEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(password, user.getUserPassword());
        }

        return false;
    }
}
