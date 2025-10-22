package fit.iuh.kh3tshopbe.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "order-detail")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_deatail_id")
    private int id;
    @Column(name = "product_name")
    private int productName;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "unit_price")
    private double unitPrice;
    @Column(name = "discount_percent")
    private double discountPercent;
    @Column(name = "discount_amount")
    private double discountAmount;
    @Column(name = "total_price")
    private double totalPrice;
    @Column(name = "tax_rate")
    private double taxRate;
    @Column(name = "tax_amount")
    private double taxAmount;
    @Column(name = "note")
    private String note;
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

    @ManyToOne(cascade = CascadeType.ALL,  fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
    @ManyToOne(cascade = CascadeType.ALL,  fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
}
