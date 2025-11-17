package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.request.CustomerTradingRequest;
import fit.iuh.kh3tshopbe.dto.response.CustomerTradingResponse;
import fit.iuh.kh3tshopbe.entities.CustomerTrading;
import fit.iuh.kh3tshopbe.mapper.CustomerTradingMapper;
import fit.iuh.kh3tshopbe.repository.CustomerTradingRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor

public class CustomerTradingService {
    CustomerTradingRepository customerTradingRepository;
    CustomerTradingMapper customerTradingMapper;

    public CustomerTradingResponse addCustomerTrading(CustomerTradingRequest customerTradingRequest) {
        CustomerTrading customerTrading = new CustomerTrading();
        customerTrading.setReceiverName(customerTradingRequest.getReceiverName());
        customerTrading.setReceiverAddress(customerTradingRequest.getReceiverAddress());
        customerTrading.setTradingDate(new Date());
        customerTrading.setCreatedAt(new Date());
        customerTrading.setReceiverEmail(customerTradingRequest.getReceiverEmail());
        customerTrading.setReceiverPhone(customerTradingRequest.getReceiverPhone());
        customerTrading.setTotalAmount(customerTradingRequest.getTotalAmount());
        customerTrading.setUpdatedAt(null);


        CustomerTrading savedCustomerTrading = customerTradingRepository.save(customerTrading);

        return customerTradingMapper.toCustomerTradingMapper(savedCustomerTrading);
    }

    public CustomerTrading getCustomerTradingById(int customerTradingId) {
        return customerTradingRepository.findById(customerTradingId).orElse(null);
    }
}
