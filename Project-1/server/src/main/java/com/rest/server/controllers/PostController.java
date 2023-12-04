package com.rest.server.controllers;

import com.rest.server.models.Post;
import com.rest.server.services.PostService;
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
@RequestMapping("/api/v1/posts")

public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<PagedModel<EntityModel<Post>>> getAllPosts(Pageable pageable) {
        Page<Post> postsPage = postService.allPosts(pageable);
        List<EntityModel<Post>> postModels = postsPage.getContent().stream()
                .map(post -> EntityModel.of(post, linkTo(methodOn(PostController.class).getSinglePost(post.getPostId())).withSelfRel()))
                .collect(Collectors.toList());

        PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(
                pageable.getPageSize(),
                postsPage.getNumber(),
                postsPage.getTotalElements(),
                postsPage.getTotalPages());

        Link linkToAllPosts = linkTo(methodOn(PostController.class).getAllPosts(pageable)).withSelfRel();
        PagedModel<EntityModel<Post>> pagedModel = PagedModel.of(postModels, pageMetadata, linkToAllPosts);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());

        return ResponseEntity.ok().headers(headers).body(pagedModel);
    }


    private EntityModel<Post> createPostEntityModel(Post post) {
        Link selfLink = linkTo(methodOn(PostController.class).getSinglePost(post.getPostId())).withSelfRel();
        Link userLink = linkTo(methodOn(UserController.class).getSingleUser(post.getPostOwnerId())).withRel("user");
        Link editLink = linkTo(methodOn(PostController.class).updatePost(post.getPostId(), null)).withRel("edit");
        Link deleteLink = linkTo(methodOn(PostController.class).deletePost(post.getPostId())).withRel("delete");

        return EntityModel.of(post, selfLink, userLink, editLink, deleteLink);
    }


    @GetMapping(value = "/search",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Page<Post>> searchPosts(@RequestParam String query, Pageable pageable) {
        Page<Post> posts = postService.searchPosts(query, pageable);
        return ResponseEntity.ok(posts);
    }

    @GetMapping(value = "/user/{userId}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<CollectionModel<EntityModel<Post>>> getPostsByUser(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Post> postsPage = postService.findPostsByUserId(userId, page, size);

        List<EntityModel<Post>> postModels = postsPage.getContent().stream()
                .map(this::createPostEntityModel)
                .collect(Collectors.toList());

        Link linkToAll = linkTo(methodOn(PostController.class).getPostsByUser(userId, page, size)).withSelfRel();
        CollectionModel<EntityModel<Post>> collectionModel = CollectionModel.of(postModels, linkToAll);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());

        return ResponseEntity.ok().headers(headers).body(collectionModel);
    }

    @GetMapping(value = "/tag/{tag}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<CollectionModel<EntityModel<Post>>> getPostsByTag(
            @PathVariable String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Post> postsPage = postService.findPostsByTag(tag, page, size);
        List<EntityModel<Post>> postModels = postsPage.getContent().stream()
                .map(post -> {
                    Link selfLink = linkTo(methodOn(PostController.class).getSinglePost(post.getPostId())).withSelfRel();
                    return EntityModel.of(post, selfLink);
                })
                .collect(Collectors.toList());

        Link linkToAll = linkTo(methodOn(PostController.class).getPostsByTag(tag, page, size)).withSelfRel();
        CollectionModel<EntityModel<Post>> collectionModel = CollectionModel.of(postModels, linkToAll);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());
        return ResponseEntity.ok().headers(headers).body(collectionModel);
    }
    @GetMapping(value = "/{id}", produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<EntityModel<Post>> getSinglePost(@PathVariable String id) {
        return postService.singlePost(id)
                .map(this::createPostEntityModel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }




    @PostMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Post> createPost(@RequestBody Post post){
        return ResponseEntity.ok(postService.createPost(post));
    }

    @PutMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody Post post){
        return ResponseEntity.ok(postService.updatePost(id, post));
    }

    @DeleteMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<String> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return ResponseEntity.ok(id);
    }
}
