package dev.bachi.crm_demo.activity;

import dev.bachi.crm_demo.user.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ActivityRepository extends JpaRepository<Activity, UUID> {

    Activity findFirstByOwner(User user);

}
