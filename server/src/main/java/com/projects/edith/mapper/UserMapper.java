package com.projects.edith.mapper;


import com.projects.edith.dtos.UserResponseDto;
import com.projects.edith.models.User;
import com.projects.edith.request.UserRegisterRequest;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {

    User map(UserRegisterRequest userRegisterDto);
    UserResponseDto map(User user);
}
