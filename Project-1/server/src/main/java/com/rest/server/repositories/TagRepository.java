package com.rest.server.repositories;

import com.rest.server.models.Tag;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends MongoRepository<Tag, String> {
    Page<Tag> findAll(Pageable pageable);
    Optional<Tag> findByTagName(String tagName);
}
