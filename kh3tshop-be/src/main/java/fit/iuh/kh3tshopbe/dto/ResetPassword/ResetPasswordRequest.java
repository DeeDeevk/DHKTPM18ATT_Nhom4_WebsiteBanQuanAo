package fit.iuh.kh3tshopbe.dto.ResetPassword;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String token;
    private String newPassword;
}
