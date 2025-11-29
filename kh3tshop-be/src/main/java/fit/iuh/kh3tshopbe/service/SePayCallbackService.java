//package fit.iuh.kh3tshopbe.service;
//
//import fit.iuh.kh3tshopbe.configuration.SePayConfig;
//import fit.iuh.kh3tshopbe.repository.OrderRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import java.util.Map;
//
//@Service
//public class SePayCallbackService {
//
//    @Autowired
//    private SePayConfig sePayConfig;
//
//    @Autowired
//    OrderRepository orderRepository;
//
//    public ResponseEntity<?> processCallback(Map<String, Object> payload, String authHeader) {
//        try {
//            // ----- 1. Kiểm tra API Key -----
//            if (authHeader == null || !authHeader.startsWith("Apikey ")) {
//                return ResponseEntity.status(401).body(Map.of(
//                        "success", false,
//                        "message", "Unauthorized - Missing API key"
//                ));
//            }
//
//            String apiKey = authHeader.replace("Apikey ", "");
//            if (!apiKey.equals(sePayConfig.getApiKey())) {
//                return ResponseEntity.status(401).body(Map.of(
//                        "success", false,
//                        "message", "Unauthorized - Invalid API key"
//                ));
//            }
//
//            // ----- 2. Lấy dữ liệu từ JSON -----
//            String id = (String) payload.get("id");
//            String gateway = (String) payload.get("gateway");
//            String transactionDate = (String) payload.get("transactionDate");
//            String accountNumber = (String) payload.get("accountNumber");
//            String code = (String) payload.get("code");
//            String content = (String) payload.get("content");
//            String transferType = (String) payload.get("transferType");
//            Double transferAmount = Double.valueOf(payload.get("transferAmount").toString());
//            String referenceCode = (String) payload.get("referenceCode");
//
//            if (!"in".equalsIgnoreCase(transferType)) {
//                return ResponseEntity.ok(Map.of(
//                        "success", true,
//                        "message", "Transaction type not supported"
//                ));
//            }
//
//            // ----- 3. Lấy Order ID -----
//            String orderId = extractOrderId(code, content);
//
//            if (orderId == null) {
//                return ResponseEntity.ok(Map.of(
//                        "success", true,
//                        "message", "Payment received but cannot identify order"
//                ));
//            }
//
//            // ----- 4. Kiểm tra Order -----
//            Optional<Order> optOrder = orderRepository.findById(orderId);
//
//            if (optOrder.isEmpty()) {
//                return ResponseEntity.ok(Map.of(
//                        "success", true,
//                        "message", "Order not found"
//                ));
//            }
//
//            Order order = optOrder.get();
//
//            // ----- 5. Kiểm tra tiền -----
//            if (transferAmount < order.getTotalAmount()) {
//                return ResponseEntity.ok(Map.of(
//                        "success", true,
//                        "message", "Payment amount insufficient"
//                ));
//            }
//
//            // ----- 6. Update Order -----
//            order.setStatus("completed");
//            order.setPaidAt(LocalDateTime.now());
//            order.setPaymentInfo(new PaymentInfo(
//                    id,
//                    gateway,
//                    transactionDate,
//                    accountNumber,
//                    transferAmount,
//                    referenceCode,
//                    content,
//                    LocalDateTime.now()
//            ));
//
//            orderRepository.save(order);
//
//            return ResponseEntity.ok(Map.of(
//                    "success", true,
//                    "message", "Payment processed successfully",
//                    "data", Map.of(
//                            "orderId", order.getId(),
//                            "status", order.getStatus(),
//                            "transactionId", id
//                    )
//            ));
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body(Map.of(
//                    "success", false,
//                    "message", "Internal server error",
//                    "error", e.getMessage()
//            ));
//        }
//    }
//
//    private String extractOrderId(String code, String content) {
//        if (code != null && !code.isEmpty()) return code;
//
//        if (content != null) {
//            var matcher = java.util.regex.Pattern
//                    .compile("ORDER[_\\s]?([a-zA-Z0-9\\-]+)", java.util.regex.Pattern.CASE_INSENSITIVE)
//                    .matcher(content);
//
//            if (matcher.find()) {
//                return matcher.group(1);
//            }
//        }
//        return null;
//    }
//
//}
