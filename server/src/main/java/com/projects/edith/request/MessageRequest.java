package com.projects.edith.request;

import lombok.Data;

import java.util.Date;

@Data
public class MessageRequest {
    private Integer receiverId;
    private String message;
    private Date timestamp;
}
