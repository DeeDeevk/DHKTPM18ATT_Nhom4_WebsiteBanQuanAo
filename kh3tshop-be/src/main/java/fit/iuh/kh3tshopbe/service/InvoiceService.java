package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.request.CreateInvoiceRequest;
import fit.iuh.kh3tshopbe.dto.response.InvoiceResponse;
import fit.iuh.kh3tshopbe.entities.Invoice;
import fit.iuh.kh3tshopbe.entities.Order;
import fit.iuh.kh3tshopbe.exception.AppException;
import fit.iuh.kh3tshopbe.exception.ErrorCode;
import fit.iuh.kh3tshopbe.mapper.InvoiceMapper;
import fit.iuh.kh3tshopbe.repository.InvoiceRepository;
import fit.iuh.kh3tshopbe.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd");
    private static final DateTimeFormatter DATETIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");
    private final OrderRepository orderRepository;

    @Transactional
    public InvoiceResponse createInvoice(CreateInvoiceRequest request) {
        // 1. Tìm Order và kiểm tra tồn tại + chưa có invoice
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + request.getOrderId()));

        if (order.getInvoice() != null) {
            throw new RuntimeException("Đơn hàng này đã có hóa đơn rồi!");
        }

        // 2. Tạo invoiceCode tự động: INV-YYYYMMDD-XXX
        String invoiceCode = generateInvoiceCode();

        // 3. Tạo invoice
        Invoice invoice = new Invoice();
        invoice.setInvoiceCode(invoiceCode);
        invoice.setPaymentMethod(request.getPaymentMethod());
        invoice.setPaymentStatus(request.getPaymentStatus());
        invoice.setSubtotalAmount(order.getCustomerTrading().getTotalAmount());
        invoice.setTaxAmount(0.0);
        invoice.setTotalAmount(order.getCustomerTrading().getTotalAmount());

        LocalDateTime now = LocalDateTime.now();
        invoice.setCreatedAt(java.sql.Timestamp.valueOf(now));
        invoice.setUpdatedAt(java.sql.Timestamp.valueOf(now));

        // Liên kết với Order
        invoice.setOrder(order);

        // Lưu
        Invoice savedInvoice = invoiceRepository.save(invoice);

        // Trả về response
        return invoiceMapper.toInvoiceMapper(savedInvoice);
    }

    // Sinh mã hóa đơn: INV-20250807-001, INV-20250807-002,...
    private String generateInvoiceCode() {
        LocalDate today = LocalDate.now();
        String datePart = today.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        long count = invoiceRepository.countByCreatedAtBetween(startOfDay, endOfDay);
        String sequence = String.format("%03d", count + 1);

        return "INV-" + datePart + "-" + sequence;
    }

    public List<InvoiceResponse> getAllInvoices() {
        return invoiceRepository.findAll().stream()
                .map(invoiceMapper::toInvoiceMapper)
                .collect(Collectors.toList());
    }

    public InvoiceResponse getInvoiceById(int id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));
        return invoiceMapper.toInvoiceMapper(invoice);
    }

}