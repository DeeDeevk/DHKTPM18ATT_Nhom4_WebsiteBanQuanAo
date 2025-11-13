package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.request.AccountRequest;
import fit.iuh.kh3tshopbe.dto.response.AccountResponse;
import fit.iuh.kh3tshopbe.entities.Account;
import fit.iuh.kh3tshopbe.entities.Customer;
import fit.iuh.kh3tshopbe.enums.Role;

import fit.iuh.kh3tshopbe.enums.StatusLogin;

import fit.iuh.kh3tshopbe.exception.AppException;
import fit.iuh.kh3tshopbe.exception.ErrorCode;
import fit.iuh.kh3tshopbe.mapper.AccountMapper;
import fit.iuh.kh3tshopbe.repository.AccountRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountService {

    AccountRepository accountRepository;
    AccountMapper accountMapper;
    PasswordEncoder passwordEncoder ;
    CustomerService customerService;
    EmailService emailService;

    public AccountResponse addAccount(AccountRequest accountRequest) {
        if(this.accountRepository.existsByUsername(accountRequest.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        Account account = accountMapper.toAccount(accountRequest);
        account.setPassword(passwordEncoder.encode(accountRequest.getPassword()));
        account.setRole(Role.USER);
        account.setStatusLogin(StatusLogin.ACTIVE);
        account.setCreateAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        account.setUpdateAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        customerService.saveCustomer(accountRequest.getCustomer());

        return  accountMapper.toAccountResponse(this.accountRepository.save(account));
    }


    public AccountResponse getAccountById(Integer id) {
        return accountMapper.toAccountResponse(this.accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found")));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<AccountResponse> getAllAccounts() {
        return this.accountRepository.findAll()
                .stream()
                .map(accountMapper::toAccountResponse)
                .toList();
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public AccountResponse getMyAccount(){
        var contextHolder = SecurityContextHolder.getContext();
        String username = contextHolder.getAuthentication().getName();
        Account account = this.accountRepository.findByUsername(username).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        return  accountMapper.toAccountResponse(account);
    }

    public AccountResponse getAccountByUsername(String username){
        Account account = this.accountRepository.findByUsername(username).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        return  accountMapper.toAccountResponse(account);
    }

    public void processForgotPassword(String email) {
        // Xử lý logic gửi email đặt lại mật khẩu
        // Ví dụ: Tạo token đặt lại mật khẩu và gửi email cho người dùng
        Customer customer = customerService.getCustomerByEmail(email);
        if(customer != null){
            Account account =  accountRepository.findByCustomerId(customer.getId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
            // Gửi email với token đặt lại mật khẩu (logic gửi email không được triển khai ở đây)
            String token = UUID.randomUUID().toString();

            // tạo link reset gửi cho user
            String resetLink = "http://localhost:8080/reset-password?token=" + token;
            System.out.println("Reset link (gửi qua email): " + resetLink);

            emailService.sendMail(
                    email,
                    "Đặt lại mật khẩu",
                    "Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu của bạn: " + resetLink
            );
        }

    }
}
