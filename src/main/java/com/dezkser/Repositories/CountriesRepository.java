package com.dezkser.Repositories;

import com.dezkser.DocumentsDB.CountryDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CountriesRepository extends MongoRepository<CountryDocument,String> {
}
