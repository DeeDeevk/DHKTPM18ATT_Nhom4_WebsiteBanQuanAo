package fit.iuh.kh3tshopbe.repository;

import fit.iuh.kh3tshopbe.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);


    // Profit theo tuần (year + week)
    @Query("SELECT YEAR(i.createdAt) as year, WEEK(i.createdAt) as week, SUM(i.totalAmount) as profit " +
            "FROM Invoice i " +
            "WHERE i.paymentStatus = 'PAID' AND i.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY YEAR(i.createdAt), WEEK(i.createdAt) " +
            "ORDER BY YEAR(i.createdAt), WEEK(i.createdAt)")
    List<Object[]> getProfitByWeek(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    // Profit theo tháng (year + month)
    @Query("SELECT YEAR(i.createdAt) as year, MONTH(i.createdAt) as month, SUM(i.totalAmount) as profit " +
            "FROM Invoice i " +
            "WHERE i.paymentStatus = 'PAID' AND i.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY YEAR(i.createdAt), MONTH(i.createdAt) " +
            "ORDER BY YEAR(i.createdAt), MONTH(i.createdAt)")
    List<Object[]> getProfitByMonth(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    // Profit theo năm
    @Query("SELECT YEAR(i.createdAt) as year, SUM(i.totalAmount) as profit " +
            "FROM Invoice i " +
            "WHERE i.paymentStatus = 'PAID' AND i.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY YEAR(i.createdAt) " +
            "ORDER BY YEAR(i.createdAt)")
    List<Object[]> getProfitByYear(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
