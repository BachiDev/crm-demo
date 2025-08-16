package dev.bachi.crm_demo.contact;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.user.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ContactRepository extends JpaRepository<Contact, UUID> {

    Contact findFirstByAccount(Account account);

    Contact findFirstByOwner(User user);

}
