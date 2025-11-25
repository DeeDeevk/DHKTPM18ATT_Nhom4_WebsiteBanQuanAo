package fit.iuh.kh3tshopbe.controller;

import fit.iuh.kh3tshopbe.dto.request.OrderRequest;
import fit.iuh.kh3tshopbe.dto.response.OrderResponse;
import fit.iuh.kh3tshopbe.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;

    @PostMapping("/create")
    public OrderResponse createOrder(@RequestBody OrderRequest orderRequest) throws ParseException {
        return orderService.createOrder(orderRequest);
    }
}
