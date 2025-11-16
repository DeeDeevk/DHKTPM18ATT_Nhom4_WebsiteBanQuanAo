// OrderDetailRepository.java
package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    @Query("SELECT od.product.id, SUM(od.quantity) " +
            "FROM OrderDetail od " +
            "WHERE od.product.id IS NOT NULL " +
            "GROUP BY od.product.id")
    List<Object[]> findSoldQuantityByProductId();

    // Hoặc nếu muốn map trực tiếp
    @Query("SELECT od.product.id, COALESCE(SUM(od.quantity), 0) " +
            "FROM OrderDetail od " +
            "WHERE od.product.id = :productId " +
            "GROUP BY od.product.id")
    Long findSoldQuantityByProductId(@Param("productId") Integer productId);
}