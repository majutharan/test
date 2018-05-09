package com.techorin.oliver.controller;

import com.techorin.oliver.domain.User;
import com.techorin.oliver.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/user")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/create")
    public @ResponseBody
    User createUser (@RequestBody User user) {
        User save = userRepository.save(user);
        return save;
    }

    @DeleteMapping(path = "/delete")
    public @ResponseBody
    ResponseEntity<Void> deleteUser(@RequestParam Long id) {
        userRepository.delete(id);
        System.out.println("dalete work");
        return ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/alluser")
    public @ResponseBody
    Iterable<User> getAllUser() {
        Iterable<User> all = userRepository.findAll();
        System.out.println("alluser");
        return all;
    }


    @PostMapping(path = "/update")
    public @ResponseBody User update(@RequestBody User user, @RequestParam Long uid) {
        User oldUser = userRepository.findOne(uid);
        oldUser.setFirstName(user.getFirstName());
        oldUser.setLastName(user.getLastName());
        oldUser.setPassword(user.getPassword());



        User updatedUser = userRepository.save(oldUser);

        return updatedUser;
    }
}
