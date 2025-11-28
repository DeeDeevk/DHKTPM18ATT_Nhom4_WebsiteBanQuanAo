package fit.iuh.kh3tshopbe.service;

import fit.iuh.kh3tshopbe.dto.request.CustomerRequest;
import fit.iuh.kh3tshopbe.dto.response.CustomerResponse;
import fit.iuh.kh3tshopbe.entities.Customer;
import fit.iuh.kh3tshopbe.enums.Status;
import fit.iuh.kh3tshopbe.mapper.CustomerMapper;
import fit.iuh.kh3tshopbe.repository.CustomerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerService {
    CustomerRepository customerRepository;
    CustomerMapper customerMapper;
    public Customer saveCustomer(CustomerRequest customerRequest){
        System.out.println("Saving customer: " + customerRequest.getFullName());
        Customer customer = customerMapper.toCustomer(customerRequest);
        customer.setCreateAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        customer.setUpdateAt(Date.from(LocalDate.now().atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        customer.setStatus(Status.ACTIVE);
        return customer;
    }

    public Customer getCustomerByEmail(String email){
        return customerRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }


    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(customerMapper::toCustomerResponse)
                .toList();
    }

    public CustomerResponse getCustomerById(int id) {
        Customer customer = customerRepository.findById(id);

        return customerMapper.toCustomerResponse(customer);
    }
}
