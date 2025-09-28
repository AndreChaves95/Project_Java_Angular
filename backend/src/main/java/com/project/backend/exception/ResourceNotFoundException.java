package com.project.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND) // Status Code: 400
public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String objectMissing, Long id) {
        super(String.format("%s not found with id: '%s'", objectMissing, id));
    }
}
