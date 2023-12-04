package com.rest.server.controllers;

import com.rest.server.models.Tag;

import com.rest.server.services.TagService;
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
@RequestMapping("/api/v1/tags")
public class TagController {
    @Autowired
    private TagService tagService;
    private EntityModel<Tag> createTagEntityModel(Tag tag) {
        Link selfLink = linkTo(methodOn(TagController.class).getSingleTag(tag.getTagId())).withSelfRel();
        Link editLink = linkTo(methodOn(TagController.class).updateTag(tag.getTagId(), null)).withRel("edit");
        Link deleteLink = linkTo(methodOn(TagController.class).deleteTag(tag.getTagId())).withRel("delete");

        return EntityModel.of(tag, selfLink, editLink, deleteLink);
    }

    @GetMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<PagedModel<EntityModel<Tag>>> getAllTags(Pageable pageable) {
        Page<Tag> tagsPage = tagService.allTags(pageable);
        List<EntityModel<Tag>> tagModels = tagsPage.getContent().stream()
                .map(this::createTagEntityModel)
                .collect(Collectors.toList());

        PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(
                tagsPage.getSize(),
                tagsPage.getNumber(),
                tagsPage.getTotalElements(),
                tagsPage.getTotalPages());

        Link linkToAllTags = linkTo(methodOn(TagController.class).getAllTags(pageable)).withSelfRel();
        PagedModel<EntityModel<Tag>> pagedModel = PagedModel.of(tagModels, pageMetadata, linkToAllTags);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());
        return ResponseEntity.ok().headers(headers).body(pagedModel);
    }



    @GetMapping(value = "/{id}", produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<EntityModel<Tag>> getSingleTag(@PathVariable String id) {
        return tagService.singleTag(id)
                .map(this::createTagEntityModel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }



    @PostMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag){
        return ResponseEntity.ok(tagService.createTag(tag));
    }

    @PutMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Tag> updateTag(@PathVariable String id, @RequestBody Tag tag){
        return ResponseEntity.ok(tagService.updateTag(id, tag));
    }

    @DeleteMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<String> deleteTag(@PathVariable String id) {
        tagService.deleteTag(id);
        return ResponseEntity.ok(id);
    }
}
