package org.birdup.api.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    /// Handles exceptions thrown for request bodies that do not
    /// pass validation constraints.
    @ExceptionHandler({
            MethodArgumentNotValidException.class
    })
    public ResponseEntity<HttpStatus> handleValidationError() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
