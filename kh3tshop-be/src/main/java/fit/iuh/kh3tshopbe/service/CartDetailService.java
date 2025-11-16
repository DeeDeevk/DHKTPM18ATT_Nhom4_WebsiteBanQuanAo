package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.request.CartDetailRequest;
import fit.iuh.kh3tshopbe.dto.response.CartDetailResponse;
import fit.iuh.kh3tshopbe.entities.Cart;
import fit.iuh.kh3tshopbe.entities.CartDetail;
import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.mapper.CartDetailMapper;
import fit.iuh.kh3tshopbe.repository.CartDetailRepository;
import fit.iuh.kh3tshopbe.repository.CartRepository;
import fit.iuh.kh3tshopbe.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import javax.management.RuntimeErrorException;
import java.util.Date;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CartDetailService {
    CartDetailRepository cartDetailRepository;
    CartDetailMapper cartDetailMapper;
    ProductRepository productRepository;
    CartRepository cartRepository;

    public CartDetailResponse addCartDetail(CartDetailRequest cartDetailRequest) {
        Product product = productRepository.findById(cartDetailRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Cart cart = cartRepository.findById(cartDetailRequest.getCartId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        CartDetail cartDetail = new CartDetail();
        cartDetail.setProduct(product);
        cartDetail.setCart(cart);
        cartDetail.setQuantity(cartDetail.getQuantity() > 0 ? cartDetail.getQuantity() : 1);
        cartDetail.setSelected(false);
        cartDetail.setUpdateAt(null);
        cartDetail.setCreateAt(new Date());
        cartDetail.setSubtotal(product.getPrice()* cartDetail.getQuantity());
        cartDetail.setPrice_at_time(product.getPrice());

        CartDetail saved = cartDetailRepository.save(cartDetail);

        return cartDetailMapper.toCartDetailResponse(saved);
    }
}
