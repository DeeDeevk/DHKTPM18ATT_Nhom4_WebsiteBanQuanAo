package fit.iuh.kh3tshopbe.controller;

import fit.iuh.kh3tshopbe.dto.response.ApiResponse;
import fit.iuh.kh3tshopbe.dto.response.CartResponse;
import fit.iuh.kh3tshopbe.entities.Cart;
import fit.iuh.kh3tshopbe.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {
    CartService cartService;

    @GetMapping("/account/{accountId}")
    public ApiResponse<CartResponse> getCartByAccountId(@PathVariable int accountId) {

        Cart cart = cartService.getCartByAccountId(accountId);

        CartResponse response = CartResponse.builder()
                .id(cart.getId())
                .totalQuantity(cart.getTotalQuantity())
                .totalAmount(cart.getTotalAmount())
                .build();

        ApiResponse<CartResponse> result = new ApiResponse<>();
        result.setResult(response);
        return result;
    }
}
