package fit.iuh.kh3tshopbe.dto.request;

import fit.iuh.kh3tshopbe.entities.CustomerTrading;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private String note;
    private int customerTradingId;
}
