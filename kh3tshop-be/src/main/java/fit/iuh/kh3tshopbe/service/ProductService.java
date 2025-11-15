package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.response.CategoryResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse;
import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {

    ProductRepository productRepository;

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
    }

    // Helper method để convert Entity -> DTO
    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
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