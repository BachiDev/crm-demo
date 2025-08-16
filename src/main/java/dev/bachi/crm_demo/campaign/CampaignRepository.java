package dev.bachi.crm_demo.campaign;

import dev.bachi.crm_demo.user.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CampaignRepository extends JpaRepository<Campaign, UUID> {

    Campaign findFirstByOwner(User user);

}
