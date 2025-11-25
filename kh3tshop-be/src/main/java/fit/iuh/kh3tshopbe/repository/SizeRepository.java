package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Size;
import fit.iuh.kh3tshopbe.enums.SizeName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SizeRepository extends JpaRepository<Size, Integer> {
<<<<<<< HEAD
=======
    Optional<Size> findByNameSize(SizeName nameSize);
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
}