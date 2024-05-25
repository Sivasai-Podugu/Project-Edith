package com.projects.edith.services;

import com.projects.edith.dtos.ContactDto;
import com.projects.edith.exception.CustomException;
import com.projects.edith.models.Contact;
import com.projects.edith.models.Message;
import com.projects.edith.repositories.ContactRepository;
import com.projects.edith.repositories.MessageRepository;
import com.projects.edith.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;
    public ResponseEntity<?> saveContact(String ownerEmail, String contactEmail){
        try{
            if(ownerEmail.equals(contactEmail)){
                throw new Exception("You cannot add yourself");
            }
            else if(!userRepository.existsByEmail(contactEmail)){
                throw new Exception("User not exist");
            }
            else if(contactRepository.existsByUserIdAndContactUserId(userRepository.findByEmail(contactEmail).getId(),userRepository.findByEmail(ownerEmail).getId())){
                throw new Exception("Contact already added");
            }
            else{
                Contact c = new Contact();
                c.setUserId(userRepository.findByEmail(ownerEmail).getId());
                c.setContactUserId(userRepository.findByEmail(contactEmail).getId());
                contactRepository.save(c);
                Contact c1 = new Contact();
                c1.setContactUserId(userRepository.findByEmail(ownerEmail).getId());
                c1.setUserId(userRepository.findByEmail(contactEmail).getId());
                contactRepository.save(c1);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }

        }catch(Exception e){
            String errorMessage = e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(errorResponse);
        }
    }
    public ResponseEntity<?> getAllContacts(String ownerEmail, Integer pageSize, Integer pageNumber, String filter){
        try{
            Integer id = userRepository.findByEmail(ownerEmail).getId();
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<Contact> contacts = contactRepository.findAllByUserId(id,pageable);
            Pageable pageableForLastMessage = PageRequest.of(0, 1);
            List<ContactDto> contactDtos= new ArrayList<ContactDto>();
            for (Contact contact:contacts.getContent()) {
                String contactName = contact.getContactUser().getName();
                if(!filter.isEmpty()) {
                    if (contactName.toLowerCase().contains(filter.toLowerCase()) || contactName.toLowerCase().startsWith(filter.toLowerCase()) || contactName.toLowerCase().endsWith(filter.toLowerCase())  ) {

                        Page<Message> message1 = messageRepository.findLastMessage(id, contact.getContactUserId(), pageableForLastMessage);
                        if (!message1.getContent().isEmpty()) {
                            ContactDto contactDto = new ContactDto(contact.getContactUserId(), contactName, message1.getContent().get(0).getMessage(), message1.getContent().get(0).getTimestamp());
                            contactDtos.add(contactDto);
                        } else {
                            ContactDto contactDto = new ContactDto(contact.getContactUserId(),contactName, "", null);
                            contactDtos.add(contactDto);
                        }
                    }
                }
                else{
                    Page<Message> message1 = messageRepository.findLastMessage(id, contact.getContactUserId(), pageableForLastMessage);
                    if(!message1.getContent().isEmpty()){
                        ContactDto contactDto = new ContactDto(contact.getContactUserId(),contactName,message1.getContent().get(0).getMessage(),message1.getContent().get(0).getTimestamp());
                        contactDtos.add(contactDto);
                    }
                    else {
                        ContactDto contactDto = new ContactDto(contact.getContactUserId(),userRepository.findById(contact.getContactUserId()).get().getName(),"",null);
                        contactDtos.add(contactDto);
                    }

                }
            }
            if(contactDtos.isEmpty()){
                throw new Exception("No contacts found");
            } else{
                return ResponseEntity.ok(contactDtos);
            }

        }catch (Exception e){
            String errorMessage =  e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(errorResponse);
        }

    }
}
