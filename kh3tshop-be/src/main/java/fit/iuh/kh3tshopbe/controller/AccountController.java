package fit.iuh.kh3tshopbe.controller;

import fit.iuh.kh3tshopbe.dto.request.AccountRequest;
import fit.iuh.kh3tshopbe.dto.response.AccountResponse;
import fit.iuh.kh3tshopbe.dto.response.ApiResponse;
import fit.iuh.kh3tshopbe.entities.Account;
import fit.iuh.kh3tshopbe.service.AccountService;
<<<<<<< HEAD
import fit.iuh.kh3tshopbe.service.CustomerService;
=======
>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountController {
    AccountService accountService;

    // @valid thông báo cần kiểm tra request
    @PostMapping
    public ApiResponse<AccountResponse> register(@RequestBody @Valid AccountRequest accountRequest){
        ApiResponse<AccountResponse> accountApiResponse = new ApiResponse<>();
        accountApiResponse.setResult(accountService.addAccount(accountRequest));
        return accountApiResponse;
    }
    @GetMapping("/{id}")
<<<<<<< HEAD
    public ApiResponse<AccountResponse> getAccountById(@PathVariable("id") Integer id) {
        ApiResponse<AccountResponse> accountResponseApiResponse = new ApiResponse<>();
        accountResponseApiResponse.setResult(accountService.getAccountById(id));
        return accountResponseApiResponse;
=======
    public Account getAccountById(@PathVariable("id") Integer id) {
        return this.accountService.getAccountById(id);
>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15
    }
    @GetMapping
    public ApiResponse<List<AccountResponse>> getAllAccounts() {
        ApiResponse<List<AccountResponse>> response = new ApiResponse<>();
        // Giả sử bạn có phương thức getAllAccounts trong AccountService
        response.setResult(accountService.getAllAccounts());
        return response;
    }

    @GetMapping("/myinfor")
    public ApiResponse<AccountResponse> getMyAccount(){
        ApiResponse<AccountResponse> response = new ApiResponse<>();
        response.setResult(accountService.getMyAccount());
        return response;
    }
}
