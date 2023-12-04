package com.rest.server.controllers;

import com.rest.server.models.Location;

import com.rest.server.services.LocationService;
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
@RequestMapping("/api/v1/locations")

public class LocationController {
    @Autowired
    private LocationService locationService;
    private EntityModel<Location> createLocationEntityModel(Location location) {
        Link selfLink = linkTo(methodOn(LocationController.class).getSingleLocation(location.getLocationId())).withSelfRel();
        Link editLink = linkTo(methodOn(LocationController.class).updateLocation(location.getLocationId(), null)).withRel("edit");
        Link deleteLink = linkTo(methodOn(LocationController.class).deleteLocation(location.getLocationId())).withRel("delete");

        return EntityModel.of(location, selfLink, editLink, deleteLink);
    }

    @GetMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<PagedModel<EntityModel<Location>>> getAllLocations(Pageable pageable) {
        Page<Location> locationsPage = locationService.allLocations(pageable);
        List<EntityModel<Location>> locationModels = locationsPage.getContent().stream()
                .map(this::createLocationEntityModel)
                .collect(Collectors.toList());

        PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(
                locationsPage.getSize(),
                locationsPage.getNumber(),
                locationsPage.getTotalElements(),
                locationsPage.getTotalPages());

        Link linkToAllLocations = linkTo(methodOn(LocationController.class).getAllLocations(pageable)).withSelfRel();
        PagedModel<EntityModel<Location>> pagedModel = PagedModel.of(locationModels, pageMetadata, linkToAllLocations);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());
        return ResponseEntity.ok().headers(headers).body(pagedModel);
    }



    @GetMapping(value = "/{id}", produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<EntityModel<Location>> getSingleLocation(@PathVariable String id) {
        return locationService.singleLocation(id)
                .map(this::createLocationEntityModel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }



    @PostMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Location> createLocation(@RequestBody Location location){
        return ResponseEntity.ok(locationService.createLocation(location));
    }

    @PutMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Location> updateLocation(@PathVariable String id, @RequestBody Location location){
        return ResponseEntity.ok(locationService.updateLocation(id, location));
    }

    @DeleteMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<String> deleteLocation(@PathVariable String id) {
        locationService.deleteLocation(id);
        return ResponseEntity.ok(id);
    }
}
