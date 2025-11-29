package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.request.OrderRequest;
import fit.iuh.kh3tshopbe.dto.response.CustomerTradingResponse;
import fit.iuh.kh3tshopbe.dto.response.OrderResponse;
import fit.iuh.kh3tshopbe.entities.Account;
import fit.iuh.kh3tshopbe.entities.CustomerTrading;
import fit.iuh.kh3tshopbe.entities.Order;
import fit.iuh.kh3tshopbe.enums.StatusOrdering;
import fit.iuh.kh3tshopbe.mapper.CustomerTradingMapper;
import fit.iuh.kh3tshopbe.mapper.OrderMapper;
import fit.iuh.kh3tshopbe.repository.AccountRepository;
import fit.iuh.kh3tshopbe.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor

public class OrderService {
    OrderRepository orderRepository;
    CustomerTradingService customerTradingService;
    CustomerTradingMapper customerTradingMapper;
    AccountRepository accountRepository;
    OrderMapper orderMapper;

    public OrderResponse createOrder(OrderRequest request) throws ParseException {
        CustomerTrading ct = customerTradingService.getCustomerTradingById(request.getCustomerTradingId());
        Order order = new Order();
        order.setOrderCode(generateOrderCode());
        order.setNote(request.getNote());
        order.setOrderDate(new Date());
        order.setStatusOrder(StatusOrdering.PENDING);
        order.setCustomerTrading(ct);

        Order saved = orderRepository.save(order);

        return orderMapper.toOrderMapper(saved);
    }

    public int countTodayOrders() throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String todayStr = sdf.format(new Date());

        SimpleDateFormat fullSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date start = fullSdf.parse(todayStr + " 00:00:00");
        Date end = fullSdf.parse(todayStr + " 23:59:59");

        return orderRepository.countOrderByOrderDateBetween(start, end);
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toOrderMapper)
                .collect(Collectors.toList());
    }

    public OrderResponse updateOrderStatus(int orderId, StatusOrdering statusOrder) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        order.setStatusOrder(statusOrder);
        Order updated = orderRepository.save(order);
        return orderMapper.toOrderMapper(updated);
    }

    // Thêm method mới để áp cứng CONFIRMED
//    public OrderResponse confirmOrder(int orderId) {
//        return updateOrderStatus(orderId, StatusOrdering.CONFIRMED);
//    }

    private String generateOrderCode() throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String todayStr = sdf.format(new Date());

        SimpleDateFormat fullSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date start = fullSdf.parse(todayStr + " 00:00:00");
        Date end = fullSdf.parse(todayStr + " 23:59:59");

        int countToday = orderRepository.countOrderByOrderDateBetween(start, end) + 1;
        String index = String.format("%03d", countToday);

        SimpleDateFormat codeDate = new SimpleDateFormat("yyyyMMdd");
        return "ORD" + codeDate.format(new Date()) + index;
    }

}
