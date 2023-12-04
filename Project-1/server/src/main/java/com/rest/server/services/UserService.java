package com.rest.server.services;

import com.rest.server.exception.ResourceNotFoundException;
import com.rest.server.models.User;
import com.rest.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public Page<User> allUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Optional<User> singleUser(String id){
        return Optional.ofNullable(userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id)));
    }
    public Page<User> searchUsers(String query, Pageable pageable) {
        // Implement search logic for users
        // Example: Search by firstName, lastName, or email
        return userRepository.findByUserFirstNameContainingIgnoreCaseOrUserLastNameContainingIgnoreCaseOrUserEmailContainingIgnoreCase(query, query, query, pageable);
    }
    public User createUser(User user) {
        if (userRepository.findByUserEmail(user.getUserEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        validateUserFields(user);


        // Encrypt password and save user
        String encryptedPassword = new BCryptPasswordEncoder().encode(user.getUserPassword());
        user.setUserPassword(encryptedPassword);
        return userRepository.save(user);
    }

    private void validateUserFields(User user) {
        if (user.getUserFirstName() == null || user.getUserFirstName().isEmpty()) {
            throw new RuntimeException("First name is required");
        }
        if (user.getUserLastName() == null || user.getUserLastName().isEmpty()) {
            throw new RuntimeException("Last name is required");
        }
        if (user.getUserEmail() == null || user.getUserEmail().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        // Add other required field checks as necessary
    }

    public User updateUser(String id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUserFirstName(updatedUser.getUserFirstName());
                    user.setUserLastName(updatedUser.getUserLastName());
                    user.setUserTitle(updatedUser.getUserTitle());
                    user.setUserPassword(updatedUser.getUserPassword());
                    user.setUserDateOfBirth(updatedUser.getUserDateOfBirth());
                    user.setUserPhone(updatedUser.getUserPhone());
                    user.setUserPicture(updatedUser.getUserPicture());
                    user.setUserLocationId(updatedUser.getUserLocationId());
                    return userRepository.save(user);
                }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
