package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Address;
import pl.katering.katering.classes.Customer;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    @Query("SELECT a FROM Address a WHERE a.customer.customer_id = :id")
    List<Address> findByCustomerId(Integer id);

    @Query("SELECT a FROM Address a WHERE a.address_id = :id")
    Address findByAddressId(Integer id);
}
