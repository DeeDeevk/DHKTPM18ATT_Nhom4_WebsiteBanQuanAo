package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Cart;
import fit.iuh.kh3tshopbe.entities.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    List<CartDetail> findByCart(Cart cart);
}
