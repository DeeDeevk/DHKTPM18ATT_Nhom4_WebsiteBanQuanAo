package fit.iuh.kh3tshopbe.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
<<<<<<< HEAD
import java.util.List;
=======
<<<<<<< HEAD
import java.util.List;
=======
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private int id;
    private String name;
    private String description;
    private double price;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
    private double costPrice; // THÊM: Giá giảm (cost_price from DB)
    private String unit;
    private int quantity;
    private String imageUrlFront;
    private String imageUrlBack;
    private Date createdAt; // THÊM: created_at
    private Date updatedAt;
    private double rating;
    private CategoryResponse category;
    private double discountAmount;
    private String material; // THÊM: material
    private String form; // THÊM: form
    private Long soldQuantity;
    private List<SizeDetailResponse> sizeDetails; // THÊM: List size details cho buttons

    // THÊM: Inner class cho SizeDetail DTO
    @Data
    @Builder
    public static class SizeDetailResponse {
        private int id;
        private String sizeName; // Từ Size.nameSize
        private int quantity; // Số lượng còn lại cho size này
    }
}

<<<<<<< HEAD
=======
=======
    private String imageUrlFront;
    private String imageUrlBack;
    private double rating;
    private CategoryResponse category;
    private double discountAmount;
    private int quantity;
    private Date updatedAt;

    private Long soldQuantity; // Tổng số lượng đã bán

}
>>>>>>> ba545a865acdd847dd81663c47e94127ccd3c1b5
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
