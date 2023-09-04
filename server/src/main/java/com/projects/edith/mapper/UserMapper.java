package com.projects.edith.mapper;


import com.projects.edith.dtos.UserRegisterDto;
import com.projects.edith.dtos.UserResponseDto;
import com.projects.edith.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User userRegisterDtoToUser(UserRegisterDto userRegisterDto);
    UserResponseDto userToUserResponseDto(User user);
}
