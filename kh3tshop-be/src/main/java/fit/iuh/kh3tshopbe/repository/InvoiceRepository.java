package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
}
