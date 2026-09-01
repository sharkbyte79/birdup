package org.birdup.api.configuration;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  /// Handles exceptions thrown for request bodies that do not pass validation constraints.
  @ExceptionHandler({MethodArgumentNotValidException.class})
  public ResponseEntity<HttpStatus> handleValidationError() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    /*@ExceptionHandler({
            ChangeSetPersister.NotFoundException.class
    })
    public ResponseEntity<HttpStatus> handleNotFoundError(Exception ex) {
    }*/
}
