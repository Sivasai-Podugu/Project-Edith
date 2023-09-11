package com.projects.edith.request;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private String username;
    private String name;
    private String email;
    private String password;
    private String location;
}
