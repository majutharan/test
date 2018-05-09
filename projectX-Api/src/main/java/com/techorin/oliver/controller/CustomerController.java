package com.techorin.oliver.controller;

import com.techorin.oliver.domain.Customer;
import com.techorin.oliver.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/customer")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping(path = "/create")
    public Customer CreateUser(@RequestBody Customer customer) {
        Customer save = customerRepository.save(customer);
        return save;
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Void> deleteUser(Long cid) {
        customerRepository.delete(cid);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable <Customer> allCustomer() {
        Iterable<Customer> all = customerRepository.findAll();
        return all;
    }
}
