package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.response.CategoryResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse;
import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.repository.OrderDetailRepository;
import fit.iuh.kh3tshopbe.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {

    ProductRepository productRepository;
    OrderDetailRepository orderDetailRepository; // THÊM

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();

        // Lấy tổng sold quantity cho tất cả sản phẩm
        List<Object[]> soldQuantities = orderDetailRepository.findSoldQuantityByProductId();

        // Tạo map: productId -> soldQuantity
        Map<Integer, Long> soldMap = soldQuantities.stream()
                .collect(Collectors.toMap(
                        obj -> (Integer) obj[0],
                        obj -> obj[1] != null ? ((Number) obj[1]).longValue() : 0L
                ));

        // Convert + thêm soldQuantity
        return products.stream()
                .map(product -> {
                    ProductResponse response = convertToProductResponse(product);
                    response.setSoldQuantity(soldMap.getOrDefault(product.getId(), 0L));
                    return response;
                })
                .collect(Collectors.toList());
    }

    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrlFront(product.getImageUrlFront())
                .imageUrlBack(product.getImageUrlBack())
                .rating(product.getRating())
                .discountAmount(product.getDiscountAmount())
                .quantity(product.getQuantity())
                .updatedAt(product.getUpdatedAt())
                .category(
                        CategoryResponse.builder()
                                .id(product.getCategory().getId())
                                .name(product.getCategory().getName())
                                .build()
                )
                .build();
    }
}