package com.projects.edith.controller;

import com.projects.edith.dtos.ContactDto;
import com.projects.edith.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class ContactController {

    @Autowired
    private ContactService contactService;
    @PostMapping("/addcontact")
    public ResponseEntity<?> addContact(@RequestBody ContactDto contactDto, Authentication authentication){

        return contactService.saveContact(((UserDetails)authentication.getPrincipal()).getUsername(),contactDto.getEmail());
    }

    @GetMapping("/allcontact")
    public ResponseEntity<?> getContacts(Authentication authentication){
        return contactService.getAllContacts(((UserDetails)authentication.getPrincipal()).getUsername());
    }

}
