package fit.iuh.kh3tshopbe.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "order")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int id;
    @Column(name = "order_code")
    private String orderCode;
    @Column(name = "order_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;
    @Column(name = "status_ordering")
    private StatusOrdering statusOrder;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_trading_id")
    private CustomerTrading customerTrading;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @OneToOne(mappedBy = "order")
    private Invoice invoice;
}
