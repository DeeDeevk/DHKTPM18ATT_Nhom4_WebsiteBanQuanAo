package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.request.AccountRequest;
import fit.iuh.kh3tshopbe.dto.response.AccountResponse;
import fit.iuh.kh3tshopbe.entities.Account;
import fit.iuh.kh3tshopbe.enums.Role;
<<<<<<< HEAD
import fit.iuh.kh3tshopbe.enums.StatusLogin;
=======
>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15
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

<<<<<<< HEAD
import java.time.LocalDate;
import java.util.Date;
=======
>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15
import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountService {

    AccountRepository accountRepository;
    AccountMapper accountMapper;
    PasswordEncoder passwordEncoder ;
<<<<<<< HEAD
    CustomerService customerService;
=======

>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15

    public AccountResponse addAccount(AccountRequest accountRequest) {
        if(this.accountRepository.existsByUsername(accountRequest.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        Account account = accountMapper.toAccount(accountRequest);
        account.setPassword(passwordEncoder.encode(accountRequest.getPassword()));
        account.setRole(Role.USER);
<<<<<<< HEAD
        account.setStatusLogin(StatusLogin.ACTIVE);
        account.setCreateAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        account.setUpdateAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        customerService.saveCustomer(accountRequest.getCustomer());

        return  accountMapper.toAccountResponse(this.accountRepository.save(account));
    }

    public AccountResponse getAccountById(Integer id) {
        return accountMapper.toAccountResponse(this.accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found")));
=======
        return  accountMapper.toAccountResponse(this.accountRepository.save(account));
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public Account getAccountById(Integer id) {
        return this.accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<AccountResponse> getAllAccounts() {
        return this.accountRepository.findAll()
                .stream()
                .map(accountMapper::toAccountResponse)
                .toList();
    }
<<<<<<< HEAD
    @PostAuthorize("returnObject.username == authentication.name")
=======

>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15
    public AccountResponse getMyAccount(){
        var contextHolder = SecurityContextHolder.getContext();
        String username = contextHolder.getAuthentication().getName();
        Account account = this.accountRepository.findByUsername(username).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        return  accountMapper.toAccountResponse(account);
    }
}
