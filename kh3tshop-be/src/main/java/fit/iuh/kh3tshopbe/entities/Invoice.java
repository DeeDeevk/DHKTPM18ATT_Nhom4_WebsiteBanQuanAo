package fit.iuh.kh3tshopbe.entities;

import fit.iuh.kh3tshopbe.enums.PaymentMethod;
import fit.iuh.kh3tshopbe.enums.StatusPayment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "invoice")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private int id;
    @Column(name = "invoice_code")
    private String invoiceCode;
    @Column(name = "issue_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date issueDate;
    @Column(name = "due_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;
    @Column(name = "payment_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date paymentDate;
    @Column(name = "note")
    private String note;
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;
    @Column(name = "payment_statu")
    private StatusPayment paymentStatus;
    @Column(name = "subtotal_amount")
    private double subtotalAmount;
    @Column(name = "discount_amount")
    private double discountAmount;
    @Column(name = "tax_amount")
    private double taxAmount;
    @Column(name = "total_amount")
    private double totalAmount;
    @Column(name = "currency")
    private String currency;
    @Column(name = "create_by")
    private String createBy;
    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    private Date createAt;
    @Column(name = "update_at")
    @Temporal(TemporalType.DATE)
    private Date updateAt;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private Order order;

}
