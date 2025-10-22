package fit.iuh.kh3tshopbe.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "customer_trading")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CustomerTrading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trading_id")
    private int id;
    @Column(name = "receiver_name")
    private String receiverName;
    @Column(name = "receiver_phone")
    private String receiverPhone;
    @Column(name = "receiver_email")
    private String receiverEmail;
    @Column(name = "receiver_address")
    private String receiverAddress;
    @Column(name = "note")
    private String note;
    @Column(name = "payment_method")
    private String paymentMethod;
    @Column(name = "total_amount")
    private double totalAmount;
    @Column(name = "trading_date")
    @Temporal(TemporalType.DATE)
    private Date tradingDate;
    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    private Date createAt;
    @Column(name = "update_at")
    @Temporal(TemporalType.DATE)
    private Date updateAt;

    @OneToOne(mappedBy = "customerTrading")
    private Order order;

}
