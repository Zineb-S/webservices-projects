package com.rest.server.models;

import org.springframework.data.annotation.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
@Document(collection = "tags")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    private String tagId;

    @NotBlank(message = "Tag name cannot be empty")
    private String tagName;
}
