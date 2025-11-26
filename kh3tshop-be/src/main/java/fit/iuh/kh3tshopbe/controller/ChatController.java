package fit.iuh.kh3tshopbe.controller;

import fit.iuh.kh3tshopbe.entities.Product;
import fit.iuh.kh3tshopbe.repository.ProductRepository;
import fit.iuh.kh3tshopbe.service.GeminiService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final GeminiService geminiService;
    private final ProductRepository productRepository;

    // Lưu lịch sử chat theo token (dùng để Gemini nhớ ngữ cảnh)
    private static final Map<String, Deque<String>> chatHistory = new ConcurrentHashMap<>();
    private static final int MAX_MESSAGES = 10;

    public ChatController(GeminiService geminiService, ProductRepository productRepository) {
        this.geminiService = geminiService;
        this.productRepository = productRepository;
    }

    @PostMapping("/ask")
    public ResponseEntity<String> askGemini(
            HttpServletRequest request,
            @RequestBody PromptRequest promptRequest
    ) {
        String token = extractToken(request.getHeader("Authorization"));
        String userPrompt = promptRequest.getPrompt().trim();

        if (userPrompt.isEmpty()) {
            return ResponseEntity.ok("Dạ anh/chị nhắn gì cho em với ạ!");
        }

        String userId = token != null ? "user_" + token : "guest";
        Deque<String> history = chatHistory.computeIfAbsent(userId, k -> new ArrayDeque<>());

        // Lưu tin nhắn user
        history.addFirst("user: " + userPrompt);
        keepOnlyLastN(history, MAX_MESSAGES);

        // Gửi TOÀN BỘ sản phẩm với giá = costPrice
        String productContext = buildFullProductContextWithCostPrice();

        String shopInfo = """
            === KH3T SHOP - Trợ lý dễ thương ===
            - Chỉ bán online, ship toàn quốc
            - Freeship từ 500k
            - Đổi trả miễn phí 7 ngày (lỗi NSX)
            - Hotline/Zalo: 0903.456.789
            - Giờ làm: 8h30 - 22h00 
            - Quy trình đặt hàng: Chọn áo/quần muốn mua, chọn size, nhập thông tin cá nhân để ship hàng, thanh toán qua ngân hàng, ví điện tử, tiền mặt, các thắc mắc khác liên hệ MrK qua zalo số 0794263939
            - Các câu hỏi khác liên hệ Mr Khánh gia Wibu qua zalo
            """;

        String historyText = history.isEmpty() ? ""
                : "Lịch sử chat gần đây (mới nhất ở trên):\n" + String.join("\n", history) + "\n";

        String finalPrompt = """
            Bạn là cô trợ lý mua sắm SIÊU DỄ THƯƠNG của KH3T Shop
            Xưng "em", gọi khách là "anh/chị", dùng thật nhiều emoji
            Trả lời tự nhiên, ngắn gọn, tối đa 3 câu thôi nha!

            Thông tin shop:
            %s

            Lịch sử chat:
            %s

            Danh sách TOÀN BỘ sản phẩm (giá hiển thị là giá bán cuối cùng - costPrice):
            %s

            Khách vừa hỏi: "%s"
            Hãy trả lời thật dễ thương và chính xác nhé!
            """.formatted(shopInfo, historyText, productContext, userPrompt);

        try {
            String reply = geminiService.generateText(finalPrompt);

            String botReply = reply == null || reply.trim().isEmpty()
                    ? "Dạ để em kiểm tra lại giúp anh/chị nha!"
                    : reply.trim();

            // Lưu tin bot
            history.addFirst("bot: " + botReply);
            keepOnlyLastN(history, MAX_MESSAGES);

            return ResponseEntity.ok(botReply);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Em đang hơi lag xíu, anh/chị nhắn lại giúp em nha!");
        }
    }

    // Gửi toàn bộ sản phẩm - GIÁ = costPrice (theo yêu cầu bạn)
    private String buildFullProductContextWithCostPrice() {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            return "Shop đang cập nhật sản phẩm mới ạ!";
        }

        StringBuilder sb = new StringBuilder("=== DANH SÁCH SẢN PHẨM ===\n");

        for (Product p : products) {

            // costPrice = giá cuối cùng → dùng luôn
            String finalPrice = String.format("%,.0fđ", p.getCostPrice());

            String sizeStr = p.getSizeDetails() == null || p.getSizeDetails().isEmpty()
                    ? "Hết hàng"
                    : p.getSizeDetails().stream()
                    .filter(sd -> sd.getQuantity() > 0)
                    .map(sd -> sd.getSize().getNameSize() + ":" + sd.getQuantity() + "c")
                    .reduce((a, b) -> a + ", " + b)
                    .orElse("Hết hàng");

            sb.append(String.format(
                    "• %s | Giá cuối: %s | Giảm: %,.0f%% | Rating: %.1f⭐ | Mô tả: %s | Chất liệu: %s | Form: %s | Size còn: %s\n",
                    p.getName(),
                    finalPrice,
                    p.getDiscountAmount(),
                    p.getRating(),
                    p.getDescription(),
                    p.getMaterial(),
                    p.getForm(),
                    sizeStr
            ));
        }

        sb.append("Tổng cộng: ").append(products.size()).append(" sản phẩm\n");
        return sb.toString();
    }



    private void keepOnlyLastN(Deque<String> deque, int max) {
        while (deque.size() > max) {
            deque.removeLast();
        }
    }

    public static class PromptRequest {
        private String prompt;
        public String getPrompt() { return prompt; }
        public void setPrompt(String prompt) { this.prompt = prompt; }
    }

    private String extractToken(String header) {
        if (header == null || !header.startsWith("Bearer ")) return null;
        return header.substring(7).trim();
    }
}