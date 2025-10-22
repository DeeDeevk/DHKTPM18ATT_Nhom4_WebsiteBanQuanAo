package fit.iuh.kh3tshopbe.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "wishlist")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class WishList {
    @Id
    @Column(name = "wishlist_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_login")
    private Account account;

    @OneToMany(mappedBy = "wishlist")
    private List<WishListDetail>  details;
}
