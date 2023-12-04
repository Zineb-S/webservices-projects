package com.rest.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String userId;
    private String userTitle;
    private String userFirstName;
    private String userLastName;
    private String userGender;
    private String userEmail;
    private String userDateOfBirth;
    private String userRegisterDate;
    private String userPhone;
    private String userPicture;
    private String userLocationId;
}
