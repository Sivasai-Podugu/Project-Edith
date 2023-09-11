package com.projects.edith.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomException {
    private String errorMessage;
}

