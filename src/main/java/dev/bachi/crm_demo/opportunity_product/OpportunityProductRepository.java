package dev.bachi.crm_demo.opportunity_product;

import dev.bachi.crm_demo.opportunity.Opportunity;
import dev.bachi.crm_demo.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OpportunityProductRepository extends JpaRepository<OpportunityProduct, Integer> {

    OpportunityProduct findFirstByOpportunity(Opportunity opportunity);

    OpportunityProduct findFirstByProduct(Product product);

}
