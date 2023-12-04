package com.rest.server.models;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
@Document(collection = "posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    private String postId;

    @NotBlank(message = "Text cannot be empty")
    @Size(min = 6, max = 1000, message = "Text must be between 6 and 1000 characters")
    private String postText;

    private String postImage;
    private Integer postLikes;
    private String postLink;
    private List<String> postTags;
    private String postPublishDate;

    @NotNull(message = "Owner cannot be null")
    private String postOwnerId;
}
