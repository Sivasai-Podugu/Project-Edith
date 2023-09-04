package com.projects.edith.services;

import com.projects.edith.exception.CustomException;
import com.projects.edith.models.Contact;
import com.projects.edith.repo.ContactRepository;
import com.projects.edith.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;
    public ResponseEntity<?> saveContact(String ownerEmail, String contactEmail){
        try{
            if(ownerEmail.equals(contactEmail)){
                throw new Exception("You cannot add yourself");
            }
            else if(!userRepository.existsByEmail(contactEmail)){
                throw new Exception("User not exist");
            }
            else if(contactRepository.existsByUseridAndContactuserid(userRepository.findByEmail(contactEmail).getId(),userRepository.findByEmail(ownerEmail).getId())){
                throw new Exception("Contact already added");
            }
            else{
                Contact c = new Contact();
                c.setUserid(userRepository.findByEmail(ownerEmail).getId());
                c.setContactuserid(userRepository.findByEmail(contactEmail).getId());
                contactRepository.save(c);
                Contact c1 = new Contact();
                c1.setContactuserid(userRepository.findByEmail(ownerEmail).getId());
                c1.setUserid(userRepository.findByEmail(contactEmail).getId());
                contactRepository.save(c1);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }

        }catch(Exception e){
            String errorMessage = e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(errorResponse);
        }
    }
    public ResponseEntity<?> getAllContacts(String ownerEmail){
        try{
            Integer id = userRepository.findByEmail(ownerEmail).getId();
            List<Map<String,Object>> result = contactRepository.findContactsAndLatestMessagesByUserId(id);
            if(result.isEmpty()){
                throw new Exception("No contacts found");
            } else{
                return ResponseEntity.ok(result);
            }

        }catch (Exception e){
            String errorMessage =  e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(errorResponse);
        }

    }
}
