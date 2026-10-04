package dev.bachi.crm_demo.opportunity;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.user.User;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OpportunityRepository extends JpaRepository<Opportunity, UUID> {

    Opportunity findFirstByAccount(Account account);

    Opportunity findFirstByContact(Contact contact);

    Opportunity findFirstByOwner(User user);

    Page<Opportunity> findByOpportunityNameContainingIgnoreCaseOrStageContainingIgnoreCase(
            String opportunityName, String stage, Pageable pageable);

}
