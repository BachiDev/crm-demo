package dev.bachi.crm_demo.activity_relation;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.activity.Activity;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.opportunity.Opportunity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ActivityRelationRepository extends JpaRepository<ActivityRelation, Long> {

    ActivityRelation findFirstByActivity(Activity activity);

    ActivityRelation findFirstByAccount(Account account);

    ActivityRelation findFirstByContact(Contact contact);

    ActivityRelation findFirstByOpportunity(Opportunity opportunity);

    @Query("""
            select ar from ActivityRelation ar
            left join ar.account acc left join ar.contact c
            left join ar.activity act left join ar.opportunity o
            where lower(coalesce(acc.accountName, '')) like lower(concat('%', :q, '%'))
               or lower(coalesce(c.firstName, '')) like lower(concat('%', :q, '%'))
               or lower(coalesce(c.lastName, '')) like lower(concat('%', :q, '%'))
               or lower(coalesce(act.subject, '')) like lower(concat('%', :q, '%'))
               or lower(coalesce(o.opportunityName, '')) like lower(concat('%', :q, '%'))
            """)
    Page<ActivityRelation> search(@Param("q") String q, Pageable pageable);

}
