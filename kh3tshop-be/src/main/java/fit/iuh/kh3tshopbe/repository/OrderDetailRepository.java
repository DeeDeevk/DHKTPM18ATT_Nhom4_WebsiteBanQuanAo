package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}
