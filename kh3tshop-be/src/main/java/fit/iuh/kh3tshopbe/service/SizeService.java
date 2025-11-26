package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.entities.Size;
import fit.iuh.kh3tshopbe.repository.SizeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor

public class SizeService {
    SizeRepository sizeRepository;

    public List<Size> getAllSizes() {
        return sizeRepository.findAll();
    }
}