package com.projects.edith.controller;

import com.projects.edith.mapper.MessageMapper;
import com.projects.edith.request.MessageRequest;
import com.projects.edith.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageMapper messageMapper;



    @PostMapping
    public ResponseEntity<?> sendMsg(@RequestBody MessageRequest messageRequest, Authentication authentication){
        return messageService.save(messageMapper.map(messageRequest),((UserDetails)authentication.getPrincipal()).getUsername());

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHistory(@PathVariable("id") Integer id,Authentication authentication){
        return messageService.getHistory(id,((UserDetails)authentication.getPrincipal()).getUsername());

    }


}
