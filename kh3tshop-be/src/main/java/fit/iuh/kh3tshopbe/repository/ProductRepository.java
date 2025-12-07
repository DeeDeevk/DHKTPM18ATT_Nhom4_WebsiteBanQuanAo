package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN FETCH p.sizeDetails sd " +
            "LEFT JOIN FETCH sd.size " +
            "LEFT JOIN FETCH p.category")
    List<Product> findAllWithDetails();
}