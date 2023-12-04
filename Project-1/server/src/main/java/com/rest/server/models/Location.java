package com.rest.server.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "locations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    @Id
    private String locationId;
    private String locationStreet;
    private String locationCity;
    private String locationState;
    private String locationCountry;
    private String locationTimezone;
}
