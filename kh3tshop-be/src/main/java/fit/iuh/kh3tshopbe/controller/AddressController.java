package fit.iuh.kh3tshopbe.controller;

<<<<<<< HEAD
import fit.iuh.kh3tshopbe.dto.request.AddressRequest;
=======
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
import fit.iuh.kh3tshopbe.dto.response.AddressResponse;
import fit.iuh.kh3tshopbe.service.AddressService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;

import java.util.List;
=======
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5

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
<<<<<<< HEAD

    @PostMapping("/add")
    public AddressResponse addAddress(@RequestBody AddressRequest addressRequest) {
        return addressService.saveAddress(addressRequest);
    }
=======
>>>>>>> 7a929c0ed50d707b8514f77cec96bb180bd16bf5
}
