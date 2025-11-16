package fit.iuh.kh3tshopbe.controller;

import com.nimbusds.jose.JOSEException;
import fit.iuh.kh3tshopbe.dto.ResetPassword.ForgotPasswordRequest;
import fit.iuh.kh3tshopbe.dto.ResetPassword.ResetPasswordRequest;
import fit.iuh.kh3tshopbe.dto.request.AuthenticationRequest;
import fit.iuh.kh3tshopbe.dto.request.IntrospectRequest;
import fit.iuh.kh3tshopbe.dto.response.AccountResponse;
import fit.iuh.kh3tshopbe.dto.response.ApiResponse;
import fit.iuh.kh3tshopbe.dto.response.AuthenticationResponse;
import fit.iuh.kh3tshopbe.dto.response.IntrospectResponse;
import fit.iuh.kh3tshopbe.entities.Account;
import fit.iuh.kh3tshopbe.entities.Customer;
import fit.iuh.kh3tshopbe.exception.AppException;
import fit.iuh.kh3tshopbe.exception.ErrorCode;
import fit.iuh.kh3tshopbe.repository.AccountRepository;
import fit.iuh.kh3tshopbe.repository.CustomerRepository;
import fit.iuh.kh3tshopbe.service.AccountService;
import fit.iuh.kh3tshopbe.service.AuthenticationService;
import fit.iuh.kh3tshopbe.service.EmailService;
import fit.iuh.kh3tshopbe.service.JwtService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    AccountService accountService;
    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspecct(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authenticationService.forgotPassword(request.getEmail());
        return ApiResponse.<String>builder()
                .result("Nếu email tồn tại trong hệ thống, liên kết đặt lại mật khẩu đã được gửi đi.")
                .build();
    }

    @PostMapping("/reset-password")
    public ApiResponse<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        authenticationService.resetPassword(request.getToken(), request.getNewPassword());
        return ApiResponse.<String>builder()
                .result("Mật khẩu của bạn đã được đặt lại thành công.")
                .build();
    }

}
