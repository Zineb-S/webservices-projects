package com.rest.server.controllers;


import com.rest.server.models.Comment;
import com.rest.server.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/comments")

public class CommentController {
    @Autowired
    private CommentService commentService;

    private EntityModel<Comment> createCommentEntityModel(Comment comment) {
        Link selfLink = linkTo(methodOn(CommentController.class).getSingleComment(comment.getCommentId())).withSelfRel();
        Link editLink = linkTo(methodOn(CommentController.class).updateComment(comment.getCommentId(), null)).withRel("edit");
        Link deleteLink = linkTo(methodOn(CommentController.class).deleteComment(comment.getCommentId())).withRel("delete");
        Link userLink = linkTo(methodOn(UserController.class).getSingleUser(comment.getCommentOwnerId())).withRel("user");
        Link postLink = linkTo(methodOn(PostController.class).getSinglePost(comment.getCommentPostId())).withRel("post");

        return EntityModel.of(comment, selfLink, userLink, postLink, editLink, deleteLink);
    }

    @GetMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<PagedModel<EntityModel<Comment>>> getAllComments(Pageable pageable) {
        Page<Comment> commentsPage = commentService.allComments(pageable);
        List<EntityModel<Comment>> commentModels = commentsPage.getContent().stream()
                .map(comment -> EntityModel.of(comment, linkTo(methodOn(CommentController.class).getSingleComment(comment.getCommentId())).withSelfRel()))
                .collect(Collectors.toList());

        PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(
                commentsPage.getSize(),
                commentsPage.getNumber(),
                commentsPage.getTotalElements(),
                commentsPage.getTotalPages());

        Link linkToAllComments = linkTo(methodOn(CommentController.class).getAllComments(pageable)).withSelfRel();
        PagedModel<EntityModel<Comment>> pagedModel = PagedModel.of(commentModels, pageMetadata, linkToAllComments);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());

        return ResponseEntity.ok().headers(headers).body(pagedModel);
    }



    @GetMapping(value = "/{id}", produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<EntityModel<Comment>> getSingleComment(@PathVariable String id) {
        return commentService.singleComment(id)
                .map(this::createCommentEntityModel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/post/{postId}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<CollectionModel<EntityModel<Comment>>> getCommentsByPost(
            @PathVariable String postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Comment> commentsPage = commentService.findCommentsByPostId(postId, page, size);
        List<EntityModel<Comment>> commentModels = commentsPage.getContent().stream()
                .map(this::createCommentEntityModel)
                .collect(Collectors.toList());
        Link linkToAll = linkTo(methodOn(CommentController.class).getCommentsByPost(postId, page, size)).withSelfRel();
        CollectionModel<EntityModel<Comment>> collectionModel = CollectionModel.of(commentModels, linkToAll);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());

        return ResponseEntity.ok().headers(headers).body(collectionModel);
    }

    @GetMapping(value = "/user/{userId}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<CollectionModel<EntityModel<Comment>>> getCommentsByUser(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Comment> commentsPage = commentService.findCommentsByUserId(userId, page, size);
        List<EntityModel<Comment>> commentModels = commentsPage.getContent().stream()
                .map(this::createCommentEntityModel)
                .collect(Collectors.toList());

        Link linkToAll = linkTo(methodOn(CommentController.class).getCommentsByUser(userId, page, size)).withSelfRel();
        CollectionModel<EntityModel<Comment>> collectionModel = CollectionModel.of(commentModels, linkToAll);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());
        return ResponseEntity.ok().headers(headers).body(collectionModel);
    }


    @PostMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment){
        return ResponseEntity.ok(commentService.createComment(comment));
    }

    @PutMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Comment> updateComment(@PathVariable String id, @RequestBody Comment comment){
        return ResponseEntity.ok(commentService.updateComment(id, comment));
    }

    @DeleteMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<String> deleteComment(@PathVariable String id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok(id);
    }
}
