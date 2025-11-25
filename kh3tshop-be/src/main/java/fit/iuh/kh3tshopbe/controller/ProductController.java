// Updated ProductController.java
package fit.iuh.kh3tshopbe.controller;

<<<<<<< HEAD
=======
<<<<<<< HEAD
import fit.iuh.kh3tshopbe.dto.request.ProductRequest;
=======
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
import fit.iuh.kh3tshopbe.dto.response.ApiResponse;
import fit.iuh.kh3tshopbe.dto.response.ProductResponse;
import fit.iuh.kh3tshopbe.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
=======
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;

import java.util.List;
=======
import org.springframework.web.bind.annotation.GetMapping;
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5

import java.util.List;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;

    @GetMapping
    public ApiResponse<List<ProductResponse>> getAllProducts() {
        ApiResponse<List<ProductResponse>> response = new ApiResponse<>();
        response.setResult(productService.getAllProducts());
        return response;
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5

    // THÊM: Endpoint cho chi tiết sản phẩm theo ID
    @GetMapping("/{id}")
    public ApiResponse<ProductResponse> getProductById(@PathVariable int id) {
        ApiResponse<ProductResponse> response = new ApiResponse<>();
        response.setResult(productService.getProductById(id));
        return response;
    }
<<<<<<< HEAD
=======

    @PostMapping
    public ApiResponse<ProductResponse> createProduct(@RequestBody ProductRequest productRequest) {
//        ApiResponse<ProductResponse> response = new ApiResponse<>();
//        response.setResult(productService.createProduct(productRequest));
//        return response;
        ApiResponse<ProductResponse> response = new ApiResponse<>();
        response.setResult(productService.createProduct(productRequest));
        return response;
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductResponse> updateProduct(@PathVariable int id, @RequestBody ProductRequest productRequest) {
        ApiResponse<ProductResponse> response = new ApiResponse<>();
        response.setResult(productService.updateProduct(id, productRequest));
        return response;
    }
=======
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
}

