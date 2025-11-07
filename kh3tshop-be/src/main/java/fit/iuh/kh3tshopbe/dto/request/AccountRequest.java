package fit.iuh.kh3tshopbe.dto.request;

<<<<<<< HEAD
import fit.iuh.kh3tshopbe.entities.Customer;
=======
>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountRequest {
    @Size(min = 3, message = "Username_Error")
    private String username;
    @Size(min = 6, message = "Password_Error")
    private String password;
<<<<<<< HEAD
    private CustomerRequest customer;
=======



>>>>>>> 58949e99b7d03f3f08e35a55d7d8194a6b7c9d15
}
