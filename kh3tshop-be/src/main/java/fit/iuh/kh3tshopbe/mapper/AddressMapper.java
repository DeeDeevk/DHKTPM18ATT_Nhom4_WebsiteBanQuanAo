package fit.iuh.kh3tshopbe.mapper;

import fit.iuh.kh3tshopbe.dto.response.AddressResponse;
import fit.iuh.kh3tshopbe.dto.response.CartDetailResponse;
import fit.iuh.kh3tshopbe.entities.Address;
import fit.iuh.kh3tshopbe.entities.CartDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressResponse toAddressResponse(Address address);
}
