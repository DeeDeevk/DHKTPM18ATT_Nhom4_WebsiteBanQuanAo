package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    Optional<Invoice> findById(int id);

    Invoice findByInvoiceCode(String invoiceCode);
}
