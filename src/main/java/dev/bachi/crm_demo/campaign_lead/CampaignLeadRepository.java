package dev.bachi.crm_demo.campaign_lead;

import dev.bachi.crm_demo.campaign.Campaign;
import dev.bachi.crm_demo.contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CampaignLeadRepository extends JpaRepository<CampaignLead, String> {

    CampaignLead findFirstByCampaign(Campaign campaign);

    CampaignLead findFirstByContact(Contact contact);

    boolean existsByStatusIgnoreCase(String status);

}
