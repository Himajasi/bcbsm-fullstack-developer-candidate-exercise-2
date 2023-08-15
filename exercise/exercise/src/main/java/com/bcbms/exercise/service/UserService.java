package com.bcbms.exercise.service;

import com.bcbms.exercise.model.User;
import com.bcbms.exercise.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveOrUpdateUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public boolean validateUserCredentials(User user) {
        User foundUser = findByUsername(user.getUsername());
        return foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword());
    }


}
