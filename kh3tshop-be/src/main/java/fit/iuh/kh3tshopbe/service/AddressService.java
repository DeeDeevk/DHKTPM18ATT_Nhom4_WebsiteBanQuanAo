package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.response.AccountResponse;
import fit.iuh.kh3tshopbe.dto.response.AddressResponse;
import fit.iuh.kh3tshopbe.dto.response.ApiResponse;
import fit.iuh.kh3tshopbe.entities.Account;
import fit.iuh.kh3tshopbe.entities.Address;
import fit.iuh.kh3tshopbe.mapper.AddressMapper;
import fit.iuh.kh3tshopbe.repository.AddressRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AddressService {
    AddressRepository addressRepository;
    AccountService accountService;
    AddressMapper addressMapper;

    public List<AddressResponse> getAddressByAccountId(int accountId) {
        Account account = accountService.getAccountByAccountId(accountId);

        List<Address> addressList = addressRepository.findByAccount(account);

        return addressList
                .stream()
                .map(addressMapper::toAddressResponse)
                .toList();
    }


}
