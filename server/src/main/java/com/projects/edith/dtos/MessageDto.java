package com.projects.edith.dtos;

import lombok.Data;


import java.util.Date;

@Data
public class MessageDto {
    private Integer receiverid;
    private String message;
    private Date timestamp;
}
