// Updated ProductService.java
package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.response.CategoryResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse.SizeDetailResponse;
import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.entities.SizeDetail;

import fit.iuh.kh3tshopbe.repository.OrderDetailRepository;
import fit.iuh.kh3tshopbe.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {

    ProductRepository productRepository;
    OrderDetailRepository orderDetailRepository;


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
                  return convertToProductResponse(product, soldMap.getOrDefault(product.getId(), 0L));
                })
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id: " + id);
        }

        Product product = optionalProduct.get();

        // Lấy sold quantity cho sản phẩm này
        Long soldQuantity = orderDetailRepository.findSoldQuantityByProductId(id);
        if (soldQuantity == null) {
            soldQuantity = 0L;
        }

        return convertToProductResponse(product, soldQuantity);
    }

    // Helper method để convert Entity -> DTO (update với fields mới)
    private ProductResponse convertToProductResponse(Product product, Long soldQuantity) {
        // Convert sizeDetails
        List<SizeDetailResponse> sizeDetailResponses = product.getSizeDetails().stream()
                .map(sd -> SizeDetailResponse.builder()
                        .id(sd.getId())
                        .sizeName(sd.getSize().getNameSize().name()) // Giả sử SizeName là enum, lấy string
                        .quantity(sd.getQuantity())
                        .build())
                .collect(Collectors.toList());
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())

                .costPrice(product.getCostPrice()) // THÊM
                .unit(product.getUnit())
                .quantity(product.getQuantity())
                .imageUrlFront(product.getImageUrlFront())
                .imageUrlBack(product.getImageUrlBack())
                .createdAt(product.getCreatedAt()) // THÊM
                .updatedAt(product.getUpdatedAt())
                .rating(product.getRating())
                .discountAmount(product.getDiscountAmount())
                .material(product.getMaterial()) // THÊM
                .form(product.getForm()) // THÊM
                .soldQuantity(soldQuantity)
                .category(
                        CategoryResponse.builder()
                                .id(product.getCategory().getId())
                                .name(product.getCategory().getName())
                                .imageUrl(product.getCategory().getImageUrl()) // THÊM
                                .build()
                )
                .sizeDetails(sizeDetailResponses) // THÊM

                                .build();
                

    }
}