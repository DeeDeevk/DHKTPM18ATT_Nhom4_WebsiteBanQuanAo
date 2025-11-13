package fit.iuh.kh3tshopbe.controller;

import fit.iuh.kh3tshopbe.service.SizeDetailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/size-details")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SizeDetailController {
    SizeDetailService sizeDetailService;
}
