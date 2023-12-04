package com.rest.server.services;

import com.rest.server.exception.ResourceNotFoundException;
import com.rest.server.models.Tag;
import com.rest.server.repositories.TagRepository;
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
public class TagService {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Page<Tag> allTags(Pageable pageable) {
        return tagRepository.findAll(pageable);
    }

    public Optional<Tag> singleTag(String id){
        return Optional.ofNullable(tagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tag not found with ID: " + id)));
    }

    public Tag createTag(Tag Tag) {
        return tagRepository.save(Tag);
    }

    public Tag updateTag(String id, Tag updatedTag) {
        return tagRepository.findById(id)
                .map(tag -> {
                    tag.setTagName(updatedTag.getTagName());
                    return tagRepository.save(tag);
                }).orElseThrow(() -> new RuntimeException("Tag not found"));
    }

    public void deleteTag(String id) {
        tagRepository.deleteById(id);
    }



}
