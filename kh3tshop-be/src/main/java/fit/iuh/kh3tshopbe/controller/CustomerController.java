package fit.iuh.kh3tshopbe.controller;

import fit.iuh.kh3tshopbe.dto.response.ApiResponse;
import fit.iuh.kh3tshopbe.dto.response.CustomerResponse;
import fit.iuh.kh3tshopbe.entities.Customer;
import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.service.CustomerService;
import fit.iuh.kh3tshopbe.service.EmailService;
import fit.iuh.kh3tshopbe.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {
    CustomerService customerService;
    ProductService productService;
    EmailService emailService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ApiResponse<List<CustomerResponse>> getCustomers() {
        ApiResponse<List<CustomerResponse>> customerResponseApiResponse = new ApiResponse<>();
        customerResponseApiResponse.setResult(customerService.getAllCustomers());
       return customerResponseApiResponse;
    }


    @PostMapping("/email/sale/all")
    public ApiResponse<?> sendSaleEmailToAll() {
        List<Customer> customers = customerService.getAll();
        List<Product> sale = productService.getSaleProducts();

        emailService.sendEmailToAllCustomers(customers, sale);

        return ApiResponse.builder()
                .result("Đã gửi email thông báo sold off đến tất cả khách hàng.")
                .build();
    }


    @GetMapping("/{id}")
    public CustomerResponse getCustomerById(@PathVariable int id) {
        return customerService.getCustomerById(id);
    }

}
