package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByDiscountAmountGreaterThan(Double amount);
}