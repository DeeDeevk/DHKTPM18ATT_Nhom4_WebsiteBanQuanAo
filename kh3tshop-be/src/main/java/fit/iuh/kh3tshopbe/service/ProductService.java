// Updated ProductService.java
package fit.iuh.kh3tshopbe.service;

<<<<<<< HEAD
import fit.iuh.kh3tshopbe.dto.response.CategoryResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse.SizeDetailResponse;
import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.entities.SizeDetail;

import fit.iuh.kh3tshopbe.repository.OrderDetailRepository;
import fit.iuh.kh3tshopbe.repository.ProductRepository;
=======
<<<<<<< HEAD
import fit.iuh.kh3tshopbe.dto.request.ProductRequest;
import fit.iuh.kh3tshopbe.dto.request.SizeDetailRequest;
import fit.iuh.kh3tshopbe.dto.request.SizeRequest;
import fit.iuh.kh3tshopbe.dto.response.CategoryResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse.SizeDetailResponse;
import fit.iuh.kh3tshopbe.entities.Category;
import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.entities.Size;
import fit.iuh.kh3tshopbe.entities.SizeDetail;

import fit.iuh.kh3tshopbe.exception.AppException;
import fit.iuh.kh3tshopbe.exception.ErrorCode;
import fit.iuh.kh3tshopbe.mapper.ProductMapper;
import fit.iuh.kh3tshopbe.repository.CategoryRepository;
import fit.iuh.kh3tshopbe.repository.OrderDetailRepository;
import fit.iuh.kh3tshopbe.repository.ProductRepository;
import fit.iuh.kh3tshopbe.repository.SizeRepository;
=======
import fit.iuh.kh3tshopbe.dto.response.CategoryResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse;
import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.repository.OrderDetailRepository;
import fit.iuh.kh3tshopbe.repository.ProductRepository;
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

<<<<<<< HEAD
import java.util.List;
import java.util.Map;
import java.util.Optional;
=======
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import java.util.List;
import java.util.Map;
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {

    ProductRepository productRepository;
<<<<<<< HEAD
    OrderDetailRepository orderDetailRepository;

=======
<<<<<<< HEAD
    OrderDetailRepository orderDetailRepository;
    CategoryRepository categoryRepository;
    SizeRepository sizeRepository;
    ProductMapper productMapper;
=======
    OrderDetailRepository orderDetailRepository; // THÊM
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5

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
<<<<<<< HEAD
                    .map(product -> {
                  return convertToProductResponse(product, soldMap.getOrDefault(product.getId(), 0L));
=======
<<<<<<< HEAD
                    .map(product -> {
                  return convertToProductResponse(product, soldMap.getOrDefault(product.getId(), 0L));
=======
                .map(product -> {
                    ProductResponse response = convertToProductResponse(product);
                    response.setSoldQuantity(soldMap.getOrDefault(product.getId(), 0L));
                    return response;
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
                })
                .collect(Collectors.toList());
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
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
<<<<<<< HEAD
=======
=======

    // Helper method để convert Entity -> DTO
    private ProductResponse convertToProductResponse(Product product) {
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5

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
<<<<<<< HEAD
=======
=======
                .imageUrlFront(product.getImageUrlFront())
                .imageUrlBack(product.getImageUrlBack())
                .rating(product.getRating())
                .discountAmount(product.getDiscountAmount())
                .quantity(product.getQuantity())
                .updatedAt(product.getUpdatedAt())
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
                .category(
                        CategoryResponse.builder()
                                .id(product.getCategory().getId())
                                .name(product.getCategory().getName())
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
                                .imageUrl(product.getCategory().getImageUrl()) // THÊM
                                .build()
                )
                .sizeDetails(sizeDetailResponses) // THÊM

                                .build();
                

    }
<<<<<<< HEAD
=======

    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .price(productRequest.getPrice())
                .unit(productRequest.getUnit())
                .imageUrlFront(productRequest.getImageUrlFront())
                .imageUrlBack(productRequest.getImageUrlBack())
                .discountAmount(productRequest.getDiscountAmount())
                .material(productRequest.getMaterial()) // THÊM
                .form(productRequest.getForm()) // THÊM
                .build();
        Category category = categoryRepository.findByName(productRequest.getCategoryRequest().getName()).orElseThrow(
                ()-> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        List<SizeDetail> sizeDetails = new ArrayList<>();
        if(sizeDetails!= null){
            productRequest.getSizeDetailRequests().forEach(sizeDetailRequest -> {
                SizeDetail sizeDetail = new SizeDetail();
                Size size = sizeRepository.findByNameSize(sizeDetailRequest.getSizeRequest().getNameSize()).orElseThrow(
                        ()-> new AppException(ErrorCode.UnknownError));
                sizeDetail.setSize(size);
                sizeDetail.setProduct(product);
                sizeDetail.setQuantity(sizeDetailRequest.getQuantity());
                sizeDetails.add(sizeDetail);
            });
        }
        int quantity = 0;
        for (SizeDetail sd : sizeDetails) {
            quantity += sd.getQuantity();
        }
        double costPrice = 0.0;
        costPrice  = productRequest.getPrice() - (productRequest.getPrice() * productRequest.getDiscountAmount()/100);
        double rating = 0.0;
        product.setCostPrice(costPrice);
        product.setRating(rating);
        product.setQuantity(quantity);
        product.setSizeDetails(sizeDetails);
        product.setCategory(category);
        product.setBrand("HK3T");
        product.setCreatedAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        product.setUpdatedAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        Product savedProduct = productRepository.save(product);
        return productMapper.toProductResponse(savedProduct);
    }

    public ProductResponse updateProduct(int id, ProductRequest productRequest) {
        Product existingProduct = productRepository.findById(id).orElseThrow(
                ()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        existingProduct.setName(productRequest.getName());
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setUnit(productRequest.getUnit());
        existingProduct.setImageUrlFront(productRequest.getImageUrlFront());
        existingProduct.setImageUrlBack(productRequest.getImageUrlBack());
        existingProduct.setDiscountAmount(productRequest.getDiscountAmount());
        existingProduct.setMaterial(productRequest.getMaterial()); // THÊM
        existingProduct.setForm(productRequest.getForm()); // THÊM

        Category category = categoryRepository.findByName(productRequest.getCategoryRequest().getName()).orElseThrow(
                ()-> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        existingProduct.setCategory(category);
        existingProduct.setUpdatedAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));

        List<SizeDetail> sizeDetails = existingProduct.getSizeDetails();
        List<SizeDetailRequest> requestedSizeDetails = productRequest.getSizeDetailRequests();
        for (SizeDetail sd : sizeDetails) {
            for (SizeDetailRequest sdr : requestedSizeDetails) {
                if (sd.getSize().getNameSize().equals(sdr.getSizeRequest().getNameSize())) {
                    sd.setQuantity(sdr.getQuantity());
                    break;
                }
            }
        }

        int quantity = 0;
        for (SizeDetail sd : sizeDetails) {
            quantity += sd.getQuantity();
        }
        double costPrice = 0.0;
        costPrice  = productRequest.getPrice() - (productRequest.getPrice() * productRequest.getDiscountAmount()/100);
        existingProduct.setCostPrice(costPrice);
        existingProduct.setQuantity(quantity);
        existingProduct.setSizeDetails(sizeDetails);
        existingProduct.setCategory(category);
        existingProduct.setBrand("HK3T");
        existingProduct.setUpdatedAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));



        Product updatedProduct = productRepository.save(existingProduct);
        return productMapper.toProductResponse(updatedProduct);
=======
                                .build()
                )
                .build();
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
    }
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
}