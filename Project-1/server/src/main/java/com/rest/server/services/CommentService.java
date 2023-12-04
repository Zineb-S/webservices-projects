package com.rest.server.services;

import com.rest.server.exception.ResourceNotFoundException;
import com.rest.server.models.Comment;
import com.rest.server.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Page<Comment> allComments(Pageable pageable) {
        return commentRepository.findAll(pageable);
    }
    public Page<Comment> findCommentsByPostId(String postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("commentPublishDate").descending());
        return commentRepository.findByCommentPostId(postId, pageable);
    }

    public Page<Comment> findCommentsByUserId(String userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("commentPublishDate").descending());
        return commentRepository.findByCommentOwnerId(userId, pageable);
    }

    public Optional<Comment> singleComment(String id){
        return Optional.ofNullable(commentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment not found with ID: " + id)));
    }

    public Comment createComment(Comment comment) {

        validateCommentFields(comment);

        return commentRepository.save(comment);
    }
    private void validateCommentFields(Comment comment) {
        if (comment.getCommentMessage() == null || comment.getCommentMessage().trim().isEmpty()) {
            throw new RuntimeException("Message cannot be empty");
        }
        if (comment.getCommentOwnerId() == null) {
            throw new RuntimeException("Owner cannot be null");
        }
        if (comment.getCommentPostId() == null || comment.getCommentPostId().trim().isEmpty()) {
            throw new RuntimeException("Post ID is mandatory");
        }
        // Add checks for other required fields as necessary
    }
    public Comment updateComment(String id, Comment updatedComment) {
        return commentRepository.findById(id)
                .map(comment -> {
                    comment.setCommentMessage(updatedComment.getCommentMessage());
                    return commentRepository.save(comment);
                }).orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
