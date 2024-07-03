package com.dezkser.DocumentsDB;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document("countries")
public class CountryDocument {
    @Id
    private String id;
    private String name;
    private String acronym;
}
