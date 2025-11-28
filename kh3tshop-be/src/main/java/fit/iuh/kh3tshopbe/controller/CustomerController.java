package fit.iuh.kh3tshopbe.controller;

import fit.iuh.kh3tshopbe.dto.request.CustomerUpdateRequest;
import fit.iuh.kh3tshopbe.dto.response.ApiResponse;
import fit.iuh.kh3tshopbe.dto.response.CustomerResponse;
import fit.iuh.kh3tshopbe.service.CustomerService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {
    CustomerService customerService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ApiResponse<List<CustomerResponse>> getCustomers() {
        ApiResponse<List<CustomerResponse>> customerResponseApiResponse = new ApiResponse<>();
        customerResponseApiResponse.setResult(customerService.getAllCustomers());
       return customerResponseApiResponse;
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update-profile")
    public ApiResponse<CustomerResponse> updateProfile(@RequestBody @Valid CustomerUpdateRequest request) {
        ApiResponse<CustomerResponse> response = new ApiResponse<>();
        response.setResult(customerService.updateCustomerProfile(request));
        response.setCode(200);
        response.setMessage("Cập nhật hồ sơ thành công");
        return response;
    }
}
