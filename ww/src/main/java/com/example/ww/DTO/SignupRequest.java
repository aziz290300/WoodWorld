package com.example.ww.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class SignupRequest {
    private String email;
    private String username;
    private String password;
    private String address;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String pictureUrl;
    private String role;

}