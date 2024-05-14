package pl.katering.katering.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.katering.katering.classes.AuthenticationResponse;
import pl.katering.katering.classes.User;
import pl.katering.katering.services.AuthenticationService;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;

    @Autowired
    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request, HttpServletResponse response) {
//        AuthenticationResponse authResponse = authService.authenticate(request, response);
//        if (authResponse != null && authResponse.getToken() != null) {
//            return ResponseEntity.ok(authResponse);
//        } else {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
//        }
        return ResponseEntity.ok(authService.authenticate(request, response));
    }
}