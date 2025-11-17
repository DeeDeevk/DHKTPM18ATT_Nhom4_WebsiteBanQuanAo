package fit.iuh.kh3tshopbe.dto.response;

import fit.iuh.kh3tshopbe.enums.StatusOrdering;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    private int id;
    private String orderCode;
    private String note;
    private Date orderDate;
    private StatusOrdering statusOrder;
    private CustomerTradingResponse customerTrading;
}
