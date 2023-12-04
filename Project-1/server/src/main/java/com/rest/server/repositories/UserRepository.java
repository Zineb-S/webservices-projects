package com.rest.server.repositories;

import com.rest.server.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // This method will handle sorting and pagination
    Page<User> findAll(Pageable pageable);
    Optional<User> findByUserEmail(String userEmail);
    Page<User> findByUserFirstNameContainingIgnoreCaseOrUserLastNameContainingIgnoreCaseOrUserEmailContainingIgnoreCase(String userFirstName, String userLastName, String userEmail, Pageable pageable);


}
