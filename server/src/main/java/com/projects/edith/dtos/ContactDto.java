package com.projects.edith.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ContactDto {
    private Integer contactUserId;
    private String contactName;
    private String latestMessage;
    private Date latestMessageTimestamp;

}
