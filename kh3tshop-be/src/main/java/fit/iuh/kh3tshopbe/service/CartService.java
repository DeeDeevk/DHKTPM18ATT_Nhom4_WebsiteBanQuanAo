package fit.iuh.kh3tshopbe.service;


import fit.iuh.kh3tshopbe.entities.Account;
import fit.iuh.kh3tshopbe.entities.Cart;

import fit.iuh.kh3tshopbe.entities.Customer;
import fit.iuh.kh3tshopbe.repository.AccountRepository;
import fit.iuh.kh3tshopbe.repository.CartRepository;
import fit.iuh.kh3tshopbe.repository.CustomerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor

public class CartService {
    CartRepository cartRepository;
    private final CustomerRepository customerRepository;
    AccountRepository accountRepository;



    public Cart saveCart(Cart cart){
            return cartRepository.save(cart);
    }

    public Cart getCartByAccountId(int accountId) {
        Account account = accountRepository.findById(accountId).orElse(null);

        return cartRepository.findByAccount(account);
    }
}
