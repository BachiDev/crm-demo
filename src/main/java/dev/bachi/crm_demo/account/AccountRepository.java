package dev.bachi.crm_demo.account;

import dev.bachi.crm_demo.user.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountRepository extends JpaRepository<Account, UUID> {

    Account findFirstByOwner(User user);

}
