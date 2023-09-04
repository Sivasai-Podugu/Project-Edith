package com.projects.edith.controller;

import com.projects.edith.dtos.UserRegisterDto;
import com.projects.edith.mapper.UserMapper;
import com.projects.edith.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDto userRegisterDto){
        return userService.save(userMapper.userRegisterDtoToUser(userRegisterDto));
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication){
        return userService.getProfile(((UserDetails)authentication.getPrincipal()).getUsername());
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getProfile(@PathVariable("id") Integer id){
        return userService.getUser(id);
    }

}
