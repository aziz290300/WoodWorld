package com.example.ww.Controller;

import com.example.ww.DTO.JwtResponse;
import com.example.ww.DTO.LoginRequest;
import com.example.ww.DTO.SignupRequest;
import com.example.ww.Entities.Role;
import com.example.ww.Entities.User;
import com.example.ww.Repository.UserRepository;
import com.example.ww.Security.JwtUtils;
import com.example.ww.Security.UserDetailsImpl;
import com.example.ww.Security.UserDetailsServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class authController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Error: Email is already taken!"));
        }

        // Create new user's account
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setAddress(signUpRequest.getAddress());
        user.setDateOfBirth(signUpRequest.getDateOfBirth());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setPictureUrl(signUpRequest.getPictureUrl());

        // Set role with default if invalid
        Role role;
        try {
            if (signUpRequest.getRole() == null || signUpRequest.getRole().isEmpty()) {
                role = Role.ROLE_USER; // Default role if null or empty
            } else {
                role = Role.valueOf(signUpRequest.getRole());
            }
        } catch (IllegalArgumentException e) {
            role = Role.ROLE_USER; // Default role if invalid role is provided
        }
        user.setRole(role);

        userRepository.save(user);

        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully!"));
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(loginRequest.getEmail());
        String jwt = jwtUtils.generateJwtToken(authentication);

        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setToken(jwt);
        jwtResponse.setId(userDetails.getId());
        jwtResponse.setEmail(userDetails.getEmail());
        jwtResponse.setUsername(userDetails.getUsername());
        jwtResponse.setPhoneNumber(userDetails.getPhoneNumber());
        jwtResponse.setPictureUrl(userDetails.getPictureUrl());
        jwtResponse.setAddress(userDetails.getAddress());
        jwtResponse.setRole(userDetails.getAuthorities().stream().findFirst().get().getAuthority());

        return ResponseEntity.ok(jwtResponse);
    }
}
