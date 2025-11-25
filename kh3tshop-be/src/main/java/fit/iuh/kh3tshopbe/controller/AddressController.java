package fit.iuh.kh3tshopbe.controller;

import fit.iuh.kh3tshopbe.dto.response.AddressResponse;
import fit.iuh.kh3tshopbe.service.AddressService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressController {
    AddressService addressService;

    @GetMapping("/{accountId}")
    public List<AddressResponse> getAddress(@PathVariable int accountId) {
        return addressService.getAddressByAccountId(accountId);
    }
}
