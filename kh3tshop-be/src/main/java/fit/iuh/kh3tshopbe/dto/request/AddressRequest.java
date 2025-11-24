package fit.iuh.kh3tshopbe.dto.request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressRequest {
    private int accountId;
    private String city;
    private String province;
    private String delivery_address;
    private String delivery_note;
}
