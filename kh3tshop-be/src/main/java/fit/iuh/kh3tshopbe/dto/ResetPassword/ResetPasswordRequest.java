package fit.iuh.kh3tshopbe.dto.ResetPassword;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResetPasswordRequest {
    String token;
    String newPassword;
<<<<<<< HEAD
=======
<<<<<<< HEAD
    String otp;
=======
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
}