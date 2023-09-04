package com.projects.edith.controller;
import com.projects.edith.dtos.MessageDto;
import com.projects.edith.mapper.MessageMapper;
import com.projects.edith.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageMapper messageMapper;



    @PostMapping("/msg")
    public ResponseEntity<?> sendMsg(@RequestBody MessageDto messageDto, Authentication authentication){
        return messageService.save(messageMapper.messageDtoToMessage(messageDto),((UserDetails)authentication.getPrincipal()).getUsername());
    }

    @GetMapping("/msgs/{id}")
    public ResponseEntity<?> getHistory(@PathVariable("id") Integer id,Authentication authentication){
        return messageService.getHistory(id,((UserDetails)authentication.getPrincipal()).getUsername());

    }


}
