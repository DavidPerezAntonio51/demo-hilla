package com.dezkser.Repositories;

import com.dezkser.DocumentsDB.ProfileDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfilesRepository extends MongoRepository<ProfileDocument,String> {
    List<ProfileDocument> findAllByShouldShowIsTrue();
}
