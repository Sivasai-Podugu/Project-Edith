package com.projects.edith.mapper;

import com.projects.edith.dtos.MessageDto;
import com.projects.edith.models.Message;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface MessageMapper {
    Message messageDtoToMessage(MessageDto messageDto);
}
