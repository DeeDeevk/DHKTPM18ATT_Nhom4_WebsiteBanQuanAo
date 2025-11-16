package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
