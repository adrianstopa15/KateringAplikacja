package pl.katering.katering.controllers;

import jakarta.servlet.http.Cookie;
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
import pl.katering.katering.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthenticationController {

    private final AuthenticationService authService;
    private final UserService userService;

    @Autowired
    public AuthenticationController(AuthenticationService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request) {
        boolean isLoginExists = userService.isUserExists(request.getLogin());
        boolean isEmailExists = userService.isEmailExists(request.getEmail());
        if (isLoginExists && isEmailExists) {
            return ResponseEntity.badRequest().body("Użytkownik o podanym loginie i emailu już istnieje");
        } else if (isLoginExists) {
            return ResponseEntity.badRequest().body("Użytkownik o podanym loginie już istnieje");
        } else if (isEmailExists) {
            return ResponseEntity.badRequest().body("Użytkownik o podanym emailu już istnieje");
        }
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request, HttpServletResponse response) {
        AuthenticationResponse authResponse = authService.authenticate(request);
        if (authResponse != null && authResponse.getToken() != null) {
            Cookie cookie = new Cookie("authToken", authResponse.getToken());
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60);
            response.addCookie(cookie);
            return ResponseEntity.ok(authResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}