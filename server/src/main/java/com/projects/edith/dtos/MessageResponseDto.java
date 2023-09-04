package com.projects.edith.dtos;

import lombok.Data;

@Data
public class MessageResponseDto {
    private String message;
    private String timestamp;
    private String senderid;
}
