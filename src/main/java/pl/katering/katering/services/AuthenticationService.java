package pl.katering.katering.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.AuthenticationResponse;
import pl.katering.katering.classes.Role;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @Autowired
    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, UserService userService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    public ResponseEntity<?> register(User request) {
        boolean isLoginExists = userService.isUserExists(request.getLogin());
        boolean isEmailExists = userService.isEmailExists(request.getEmail());
        if (isLoginExists && isEmailExists) {
            return ResponseEntity.badRequest().body("Użytkownik o podanym loginie i emailu już istnieje");
        } else if (isLoginExists) {
            return ResponseEntity.badRequest().body("Użytkownik o podanym loginie już istnieje");
        } else if (isEmailExists) {
            return ResponseEntity.badRequest().body("Użytkownik o podanym emailu już istnieje");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setLogin(request.getLogin());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf("USER"));

        user = repository.save(user);

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(new AuthenticationResponse(token));
    }

    public AuthenticationResponse authenticate(User request, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = repository.findByLogin(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);

        Cookie cookie = new Cookie("authToken", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);

        return new AuthenticationResponse(token);
    }
}
