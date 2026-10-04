package dev.bachi.crm_demo.contact;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.user.User;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ContactRepository extends JpaRepository<Contact, UUID> {

    Contact findFirstByAccount(Account account);

    Contact findFirstByOwner(User user);

    Page<Contact> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrJobTitleContainingIgnoreCase(
            String firstName, String lastName, String email, String jobTitle, Pageable pageable);

}
