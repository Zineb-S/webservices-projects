package com.rest.server.services;

import com.rest.server.exception.ResourceNotFoundException;
import com.rest.server.models.Post;
import com.rest.server.models.Tag;
import com.rest.server.repositories.PostRepository;
import com.rest.server.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private TagRepository tagRepository;
    public Page<Post> allPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }
    public Page<Post> findPostsByUserId(String userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("postPublishDate").descending());
        Query query = new Query().addCriteria(Criteria.where("postOwnerId").is(userId)).with(pageable);
        List<Post> posts = mongoTemplate.find(query, Post.class);
        long total = mongoTemplate.count(Query.of(query).limit(-1).skip(-1), Post.class);
        return new PageImpl<>(posts, pageable, total);
    }

    public Page<Post> findPostsByTag(String tagName, int page, int size) {
        Optional<Tag> tagOptional = tagRepository.findByTagName(tagName);
        if (!tagOptional.isPresent()) {
            throw new RuntimeException("Tag not found");
        }
        String tagId = tagOptional.get().getTagId();

        Pageable pageable = PageRequest.of(page, size, Sort.by("postPublishDate").descending());
        Query query = new Query().addCriteria(Criteria.where("postTags").is(tagId)).with(pageable);
        List<Post> posts = mongoTemplate.find(query, Post.class);
        long total = mongoTemplate.count(Query.of(query).limit(-1).skip(-1), Post.class);
        return new PageImpl<>(posts, pageable, total);
    }

    public Optional<Post> singlePost(String id){
        return Optional.ofNullable(postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post not found with ID: " + id)));
    }

    public Post createPost(Post post) {
        validatePostFields(post);
        return postRepository.save(post);
    }
    private void validatePostFields(Post post) {
        if (post.getPostText() == null || post.getPostText().trim().isEmpty()) {
            throw new RuntimeException("Text cannot be empty");
        }
        if (post.getPostOwnerId() == null) {
            throw new RuntimeException("Owner cannot be null");
        }
    }
    public Page<Post> searchPosts(String query, Pageable pageable) {
        // Implement search logic for posts
        // Example: Search by postText or other fields
        return postRepository.findByPostTextContainingIgnoreCase(query, pageable);
    }
    public Post updatePost(String id, Post updatedPost) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setPostText(updatedPost.getPostText());
                    post.setPostImage(updatedPost.getPostImage());
                    post.setPostLikes(updatedPost.getPostLikes());
                    post.setPostLink(updatedPost.getPostLink());
                    post.setPostTags(updatedPost.getPostTags());

                    return postRepository.save(post);
                }).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public void deletePost(String id) {
        postRepository.deleteById(id);
    }
}
