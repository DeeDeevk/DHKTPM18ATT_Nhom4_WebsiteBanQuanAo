package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.repository.SizeDetailRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor

public class SizeDetailService {
    SizeDetailRepository sizeDetailRepository;
}
