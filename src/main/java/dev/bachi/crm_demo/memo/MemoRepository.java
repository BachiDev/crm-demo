package dev.bachi.crm_demo.memo;

import dev.bachi.crm_demo.user.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MemoRepository extends JpaRepository<Memo, UUID> {

    Memo findFirstByUser(User user);

}
