package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Address;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    @Query("SELECT a FROM Address a WHERE a.customer.customerId = :id")
    List<Address> findByCustomerId(Integer id);

    @Query("SELECT a FROM Address a WHERE a.addressId = :id")
    Address findByAddressId(Integer id);

    @Query("SELECT a FROM Address a WHERE a.customer.customerId IS NULL")
    List<Address> findCompanyAddresses();

    @Query("SELECT a FROM Address a WHERE a.company.companyId IS NULL")
    List<Address> findCustomerAddresses();
}
