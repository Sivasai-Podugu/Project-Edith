package com.projects.edith.dtos;

import lombok.Data;

@Data
public class UserResponseDto {
    private Integer id;
    private String username;
    private String name;
    private String email;
    private String location;
}
