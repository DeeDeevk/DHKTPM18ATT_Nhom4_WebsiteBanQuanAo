package fit.iuh.kh3tshopbe.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import fit.iuh.kh3tshopbe.enums.SizeName;

@Entity
@Table(name = "size")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name_size", nullable = false)
    private SizeName nameSize;
}
