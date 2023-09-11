package com.projects.edith.mapper;

import com.projects.edith.models.Message;
import com.projects.edith.request.MessageRequest;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface MessageMapper {
    Message map(MessageRequest messageRequest);
}
