package fit.iuh.kh3tshopbe.dto.request;
import fit.iuh.kh3tshopbe.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.Date;

@Data
public class CustomerUpdateRequest {
    @NotNull(message = "Customer ID is required")
    private int id; // ID của Customer để biết bản ghi nào cần cập nhật

    @NotBlank(message = "Full Name cannot be blank")
    private String fullName;

    @NotBlank(message = "Phone Number cannot be blank")
    private String phoneNumber;

    @Email(message = "Invalid email format")
    private String email;

    private Gender gender;
    private Date dateOfBirth;
}