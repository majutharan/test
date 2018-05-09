package com.techorin.oliver.repo;

import com.techorin.oliver.domain.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

}
