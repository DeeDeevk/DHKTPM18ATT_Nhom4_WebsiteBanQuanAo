package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

<<<<<<< HEAD
    Customer findByEmail(String email);
    boolean existsByEmail(String email);

    Customer findById(int id);

=======
    Optional<Customer> findByEmail(String email);
    boolean existsByEmail(String email);

<<<<<<< HEAD
    Customer findById(int id);

=======
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
}
