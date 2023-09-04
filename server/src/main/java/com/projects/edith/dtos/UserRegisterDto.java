package com.projects.edith.dtos;

import lombok.Data;

@Data
public class UserRegisterDto {
    private String username;
    private String name;
    private String email;
    private String password;
    private String location;
}
