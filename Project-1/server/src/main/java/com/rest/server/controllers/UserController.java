package com.rest.server.controllers;

import com.rest.server.models.User;
import com.rest.server.models.UserDto;
import com.rest.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
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
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private MessageSource messageSource;
    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setUserTitle(user.getUserTitle());
        userDto.setUserFirstName(user.getUserFirstName());
        userDto.setUserLastName(user.getUserLastName());
        userDto.setUserGender(user.getUserGender());
        userDto.setUserEmail(user.getUserEmail());
        userDto.setUserDateOfBirth(user.getUserDateOfBirth());
        userDto.setUserRegisterDate(user.getUserRegisterDate());
        userDto.setUserPhone(user.getUserPhone());
        userDto.setUserPicture(user.getUserPicture());
        userDto.setUserLocationId(user.getUserLocationId());
        return userDto;
    }
    private EntityModel<UserDto> createUserEntityModel(UserDto userDto) {
        Link selfLink = linkTo(methodOn(UserController.class).getSingleUser(userDto.getUserId())).withSelfRel();
        Link editLink = linkTo(methodOn(UserController.class).updateUser(userDto.getUserId(), null)).withRel("edit");
        Link deleteLink = linkTo(methodOn(UserController.class).deleteUser(userDto.getUserId())).withRel("delete");

        return EntityModel.of(userDto, selfLink, editLink, deleteLink);
    }

    //Accept: application/json;q=1, application/xml;q=0.5
    @GetMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" } )
    public ResponseEntity<PagedModel<EntityModel<UserDto>>> getAllUsersV1(Pageable pageable) {
        Page<User> usersPage = userService.allUsers(pageable);
        List<EntityModel<UserDto>> userModels = usersPage.map(this::convertToDto)
                .getContent().stream()
                .map(this::createUserEntityModel)
                .collect(Collectors.toList());

        PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(
                usersPage.getSize(),
                usersPage.getNumber(),
                usersPage.getTotalElements(),
                usersPage.getTotalPages());

        Link linkToAllUsers = linkTo(methodOn(UserController.class).getAllUsersV1(pageable)).withSelfRel();
        PagedModel<EntityModel<UserDto>> pagedModel = PagedModel.of(userModels, pageMetadata, linkToAllUsers);
        HttpHeaders headers = new HttpHeaders();
        //headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES));
        //headers.setExpires(System.currentTimeMillis() + 1800000);
        headers.setCacheControl(CacheControl.noCache());
        return ResponseEntity.ok().headers(headers).body(pagedModel);
    }

    // Version 2 of the API (as an example)
    @GetMapping(produces = "application/vnd.myapi.v2+json")
    public ResponseEntity getAllUsersV2() {
       return ResponseEntity.ok("Version 2 of this api");
    }

    @GetMapping(value = "/{id}", produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<EntityModel<UserDto>> getSingleUser(@PathVariable String id) {
        return userService.singleUser(id)
                .map(this::convertToDto)
                .map(this::createUserEntityModel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping(value = "/search",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<Page<User>> searchUsers(@RequestParam String query, Pageable pageable) {
        Page<User> users = userService.searchUsers(query, pageable);
        return ResponseEntity.ok(users);
    }

    @PostMapping(produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<User> createUser(@RequestBody User user){
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user){
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping(value = "/{id}",produces = { "application/vnd.myapi.v1+json", "application/vnd.myapi.v1+xml" })
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(id);
    }

}
