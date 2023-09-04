package com.projects.edith.services;

import com.projects.edith.exception.CustomException;
import com.projects.edith.mapper.UserMapper;
import com.projects.edith.models.User;
import com.projects.edith.repo.UserRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Setter
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User emp = userRepository.findByEmail(username);
        org.springframework.security.core.userdetails.User user = new org.springframework.security.core.userdetails.User(emp.getEmail(), emp.getPassword(), new ArrayList<>());
        return user;
    }

    public ResponseEntity<?> save(User user){
        try{
            user.setPassword(bcryptEncoder.encode(user.getPassword()));
            if(!userRepository.existsByEmail(user.getEmail())){
                userRepository.save(user);
            }
            else{
                throw new Exception("Email already exists");
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch (Exception e){
            String errorMessage = "Unable to save the user: " + e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(errorResponse);
        }
    }


    public ResponseEntity<?> getProfile(String email){
        return ResponseEntity.ok(userMapper.userToUserResponseDto(userRepository.findByEmail(email)));
    }


    public ResponseEntity<?> getUser(Integer id){
        try{
            if(userRepository.existsById(id)){
                return ResponseEntity.ok(userMapper.userToUserResponseDto(userRepository.findById(id).get()));
            }else{
                throw new Exception("User not found");
            }
        }catch (Exception e){
            String errorMessage = e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

    }
    public Authentication authenticate(String username, String password) {
        UserDetails userDetails;
        try {
            userDetails = loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            throw new BadCredentialsException("Invalid username");
        }

        if (!bcryptEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
