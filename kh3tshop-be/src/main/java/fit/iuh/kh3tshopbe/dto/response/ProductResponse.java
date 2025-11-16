package fit.iuh.kh3tshopbe.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private String name;
    private String description;
    private double price;
    private String imageUrlFront;
    private String imageUrlBack;
    private double rating;
    private CategoryResponse category;
    private double discountAmount;
    private int quantity;
    private Date updatedAt;

}
