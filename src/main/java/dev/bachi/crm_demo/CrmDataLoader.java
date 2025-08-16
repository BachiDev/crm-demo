package dev.bachi.crm_demo;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity.Activity;
import dev.bachi.crm_demo.activity.ActivityRepository;
import dev.bachi.crm_demo.activity_relation.ActivityRelation;
import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
import dev.bachi.crm_demo.campaign.Campaign;
import dev.bachi.crm_demo.campaign.CampaignRepository;
import dev.bachi.crm_demo.campaign_lead.CampaignLead;
import dev.bachi.crm_demo.campaign_lead.CampaignLeadRepository;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.memo.Memo;
import dev.bachi.crm_demo.memo.MemoRepository;
import dev.bachi.crm_demo.opportunity.Opportunity;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
import dev.bachi.crm_demo.opportunity_product.OpportunityProduct;
import dev.bachi.crm_demo.opportunity_product.OpportunityProductRepository;
import dev.bachi.crm_demo.product.Product;
import dev.bachi.crm_demo.product.ProductRepository;
import dev.bachi.crm_demo.user.User;
import dev.bachi.crm_demo.user.UserRepository;

@Component
public class CrmDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final ContactRepository contactRepository;
    private final CampaignRepository campaignRepository;
    private final ProductRepository productRepository;
    private final OpportunityRepository opportunityRepository;
    private final ActivityRepository activityRepository;
    private final MemoRepository memoRepository;
    private final ActivityRelationRepository activityRelationRepository;
    private final CampaignLeadRepository campaignLeadRepository;
    private final OpportunityProductRepository opportunityProductRepository;

    public CrmDataLoader(UserRepository userRepository, AccountRepository accountRepository,
            ContactRepository contactRepository, CampaignRepository campaignRepository,
            ProductRepository productRepository, OpportunityRepository opportunityRepository,
            ActivityRepository activityRepository, MemoRepository memoRepository,
            ActivityRelationRepository activityRelationRepository, CampaignLeadRepository campaignLeadRepository,
            OpportunityProductRepository opportunityProductRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.contactRepository = contactRepository;
        this.campaignRepository = campaignRepository;
        this.productRepository = productRepository;
        this.opportunityRepository = opportunityRepository;
        this.activityRepository = activityRepository;
        this.memoRepository = memoRepository;
        this.activityRelationRepository = activityRelationRepository;
        this.campaignLeadRepository = campaignLeadRepository;
        this.opportunityProductRepository = opportunityProductRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only load data if the repository is empty to prevent duplicates on restart
        if (userRepository.count() == 0) {
            System.out.println("Loading all sample data...");

            // 1. Create and save Users
            User jdoe = new User();
            jdoe.setUsername("jdoe");
            jdoe.setEmail("jdoe@example.com");
            jdoe.setFirstName("John");
            jdoe.setLastName("Doe");
            jdoe.setPasswordHash("hashed_password_123");
            userRepository.save(jdoe);

            User asmith = new User();
            asmith.setUsername("asmith");
            asmith.setEmail("asmith@example.com");
            asmith.setFirstName("Alice");
            asmith.setLastName("Smith");
            asmith.setPasswordHash("hashed_password_456");
            userRepository.save(asmith);

            User bmiller = new User();
            bmiller.setUsername("bmiller");
            bmiller.setEmail("bmiller@example.com");
            bmiller.setFirstName("Bob");
            bmiller.setLastName("Miller");
            bmiller.setPasswordHash("hashed_password_789");
            userRepository.save(bmiller);

            // 2. Create Products
            Product crmPro = new Product();
            crmPro.setProductName("CRM-Pro Software");
            crmPro.setSku("CRM-PRO-SKU");
            crmPro.setPrice(new BigDecimal(50000.00));
            crmPro.setDescription("Advanced CRM solution for enterprise businesses.");
            productRepository.save(crmPro);

            Product dataModule = new Product();
            dataModule.setProductName("Data Analytics Module");
            dataModule.setSku("DATA-ANALYTICS-MOD");
            dataModule.setPrice(new BigDecimal(15000.00));
            dataModule.setDescription("Module for advanced data reporting and analysis.");
            productRepository.save(dataModule);

            // 3. Create Accounts
            Account techCorp = new Account();
            techCorp.setAccountName("TechCorp Solutions");
            techCorp.setIndustry("Technology");
            techCorp.setWebsite("techcorpsolutions.com");
            techCorp.setPhone("555-123-4567");
            techCorp.setOwner(jdoe);
            accountRepository.save(techCorp);

            Account globalInnovate = new Account();
            globalInnovate.setAccountName("Global Innovate Inc.");
            globalInnovate.setIndustry("Manufacturing");
            globalInnovate.setWebsite("globalinnovate.com");
            globalInnovate.setPhone("555-987-6543");
            globalInnovate.setOwner(asmith);
            accountRepository.save(globalInnovate);

            // 4. Create Campaigns
            Campaign q3LeadGen = new Campaign();
            q3LeadGen.setCampaignName("Q3 Lead Generation");
            q3LeadGen.setCampaignType("Email Marketing");
            q3LeadGen.setStatus("active");
            q3LeadGen.setOwner(asmith);
            campaignRepository.save(q3LeadGen);

            // 5. Create Contacts
            Contact sarah = new Contact();
            sarah.setFirstName("Sarah");
            sarah.setLastName("Johnson");
            sarah.setEmail("sjohnson@techcorp.com");
            sarah.setJobTitle("CTO");
            sarah.setOwner(jdoe);
            sarah.setAccount(techCorp);
            contactRepository.save(sarah);

            Contact michael = new Contact();
            michael.setFirstName("Michael");
            michael.setLastName("Chen");
            michael.setEmail("mchen@globalinnovate.com");
            michael.setJobTitle("Procurement Manager");
            michael.setOwner(asmith);
            michael.setAccount(globalInnovate);
            contactRepository.save(michael);

            Contact emily = new Contact();
            emily.setFirstName("Emily");
            emily.setLastName("Davis");
            emily.setEmail("edavis@example.com");
            emily.setJobTitle("IT Director");
            emily.setOwner(bmiller);
            emily.setAccount(null);
            emily.setIsLead(true);
            contactRepository.save(emily);

            // 6. Create Opportunities
            Opportunity techCorpOpportunity = new Opportunity();
            techCorpOpportunity.setOpportunityName("TechCorp IT Infrastructure Upgrade");
            techCorpOpportunity.setOwner(jdoe);
            techCorpOpportunity.setAccount(techCorp);
            techCorpOpportunity.setContact(sarah);
            techCorpOpportunity.setAmount(new BigDecimal(150000.00));
            techCorpOpportunity.setStage("negotiation");
            opportunityRepository.save(techCorpOpportunity);

            // 7. Create Activities
            Activity callActivity = new Activity();
            callActivity.setActivityType("call");
            callActivity.setSubject("Follow-up call with Sarah Johnson");
            callActivity.setOwner(jdoe);
            callActivity.setStatus("planned");
            activityRepository.save(callActivity);

            Activity emailActivity = new Activity();
            emailActivity.setActivityType("email");
            emailActivity.setSubject("Send proposal to Michael Chen");
            emailActivity.setOwner(asmith);
            emailActivity.setStatus("in_progress");
            activityRepository.save(emailActivity);

            // 8. Create Memos
            Memo accountMemo = new Memo();
            accountMemo.setRelatedToType("account");
            accountMemo.setRelatedToId(techCorp.getAccountId());
            accountMemo.setUser(jdoe);
            accountMemo.setMemoText("Discussed upcoming project needs. Client is interested in new AI solutions.");
            memoRepository.save(accountMemo);

            Memo contactMemo = new Memo();
            contactMemo.setRelatedToType("contact");
            contactMemo.setRelatedToId(emily.getContactId());
            contactMemo.setUser(bmiller);
            contactMemo.setMemoText("Initial contact made. Emily is a key decision-maker for IT procurement.");
            memoRepository.save(contactMemo);

            // 9. Create Campaign_Leads
            CampaignLead campaignLead = new CampaignLead();
            campaignLead.setCampaign(q3LeadGen);
            campaignLead.setContact(emily);
            campaignLead.setStatus("sent");
            campaignLeadRepository.save(campaignLead);

            // 10. Create Opportunity_Products
            OpportunityProduct opportunityProduct1 = new OpportunityProduct();
            opportunityProduct1.setOpportunity(techCorpOpportunity);
            opportunityProduct1.setProduct(crmPro);
            opportunityProduct1.setQuantity(1);
            opportunityProduct1.setPrice(crmPro.getPrice());
            opportunityProductRepository.save(opportunityProduct1);

            OpportunityProduct opportunityProduct2 = new OpportunityProduct();
            opportunityProduct2.setOpportunity(techCorpOpportunity);
            opportunityProduct2.setProduct(dataModule);
            opportunityProduct2.setQuantity(1);
            opportunityProduct2.setPrice(dataModule.getPrice());
            opportunityProductRepository.save(opportunityProduct2);

            // 11. Create Activity_Relations
            ActivityRelation relation1 = new ActivityRelation();
            relation1.setActivity(callActivity);
            relation1.setAccount(techCorp);
            relation1.setContact(sarah);
            relation1.setOpportunity(null);
            activityRelationRepository.save(relation1);

            ActivityRelation relation2 = new ActivityRelation();
            relation2.setActivity(emailActivity);
            relation2.setAccount(globalInnovate);
            relation2.setContact(michael);
            relation2.setOpportunity(null);
            activityRelationRepository.save(relation2);

            System.out.println("All sample data loaded successfully!");
        }
    }
}