package com.projects.edith.services;


import com.projects.edith.exception.CustomException;
import com.projects.edith.models.Message;
import com.projects.edith.repo.MessageRepository;
import com.projects.edith.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;
    public ResponseEntity<?> save(Message message,String ownerEmail){
        try{
            message.setSenderid(userRepository.findByEmail(ownerEmail).getId());
            return ResponseEntity.ok(messageRepository.save(message));
        }catch(Exception e){
            String errorMessage = "An error occurred while sending message: " + e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    public ResponseEntity<?> getHistory(Integer id2,String ownerEmail){
        try{
            Integer id1 = userRepository.findByEmail(ownerEmail).getId();
            return ResponseEntity.ok(messageRepository.findMessagesAndDetailsBetweenUsers(id1,id2));
        }catch (Exception e){
            String errorMessage = "An error occurred while getting history: " + e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
