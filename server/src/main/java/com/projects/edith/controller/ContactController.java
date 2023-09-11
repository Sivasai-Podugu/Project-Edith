package com.projects.edith.controller;

import com.projects.edith.request.ContactRequest;
import com.projects.edith.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;
    @PostMapping
    public ResponseEntity<?> addContact(@RequestBody ContactRequest contactRequest, Authentication authentication){

        return contactService.saveContact(((UserDetails)authentication.getPrincipal()).getUsername(),contactRequest.getEmail());
    }

    @GetMapping
    public ResponseEntity<?> getContacts(Authentication authentication,  @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                         @RequestParam(name = "pageSize", defaultValue = "7") int pageSize,
                                         @RequestParam(name="filter", defaultValue = "") String filter) {
        return contactService.getAllContacts(((UserDetails)authentication.getPrincipal()).getUsername(), pageSize,pageNumber,filter);
    }

}
