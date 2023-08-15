package com.bcbms.exercise.controller;

import com.bcbms.exercise.model.User;
import com.bcbms.exercise.service.UserService;
import com.bcbms.exercise.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    public static class AuthenticationResponse {
        private final String jwt;

        public AuthenticationResponse(String jwt) {
            this.jwt = jwt;
        }

        public String getJwt() {
            return jwt;
        }
    }


//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody User user) {
//        User existingUser = userService.findByUsername(user.getUsername());
//        if (existingUser != null) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
//        }
//        return ResponseEntity.ok(userService.saveOrUpdateUser(user));
//    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        if (userService.validateUserCredentials(user)) {
            String jwt = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile")
    public User getProfile(@RequestParam String username) {
        return userService.findByUsername(username);
    }

//    @PutMapping("/update")
//    public User updateProfile(@RequestBody User user) {
//        return userService.saveOrUpdateUser(user);
//    }

    @PostMapping("/saveOrUpdate")
    public ResponseEntity<?> saveOrUpdateUser(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser == null) {
            return ResponseEntity.ok(userService.saveOrUpdateUser(user));  // SAVE operation
        } else {
            if (user.getId() != null && user.getId().equals(existingUser.getId())) {
                return ResponseEntity.ok(userService.saveOrUpdateUser(user));  // UPDATE operation
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }
        }
    }

}
