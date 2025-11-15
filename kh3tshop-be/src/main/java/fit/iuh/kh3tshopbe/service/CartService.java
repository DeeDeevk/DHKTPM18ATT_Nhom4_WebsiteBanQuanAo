package fit.iuh.kh3tshopbe.service;


import fit.iuh.kh3tshopbe.entities.Cart;

import fit.iuh.kh3tshopbe.repository.CartRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor

public class CartService {
    CartRepository cartRepository;


    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }
}
