package dev.bachi.crm_demo.activity_relation;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.activity.Activity;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.opportunity.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ActivityRelationRepository extends JpaRepository<ActivityRelation, Long> {

    ActivityRelation findFirstByActivity(Activity activity);

    ActivityRelation findFirstByAccount(Account account);

    ActivityRelation findFirstByContact(Contact contact);

    ActivityRelation findFirstByOpportunity(Opportunity opportunity);

}
