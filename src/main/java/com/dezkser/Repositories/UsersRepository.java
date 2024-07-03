package com.dezkser.Repositories;

import com.dezkser.DocumentsDB.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends MongoRepository<UserDocument,String> {
    Optional<UserDocument> findByUsername(String pUsername);
}
