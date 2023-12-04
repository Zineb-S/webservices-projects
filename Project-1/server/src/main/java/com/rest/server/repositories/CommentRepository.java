package com.rest.server.repositories;

import com.rest.server.models.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    Page<Comment> findAll(Pageable pageable);
    Page<Comment> findByCommentPostId(String postId, Pageable pageable);
    Page<Comment> findByCommentOwnerId(String ownerId, Pageable pageable);
}
