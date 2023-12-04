package com.rest.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String userId;

    private String userTitle;

    @NotBlank(message = "First name is mandatory")
    @NotNull
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String userFirstName;

    @NotBlank(message = "Last name is mandatory")
    @NotNull
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String userLastName;

    private String userGender;

    @Email(message = "Email should be valid")
    private String userEmail;

    @NotBlank(message = "Password is mandatory")
    private String userPassword;

    private String userDateOfBirth;
    private String userRegisterDate;
    private String userPhone;
    private String userPicture;
    private String userLocationId;
}
