package dev.bachi.crm_demo.opportunity;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity_relation.ActivityRelation;
import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.opportunity_product.OpportunityProduct;
import dev.bachi.crm_demo.opportunity_product.OpportunityProductRepository;
import dev.bachi.crm_demo.user.User;
import dev.bachi.crm_demo.user.UserRepository;
import dev.bachi.crm_demo.util.CustomCollectors;
import dev.bachi.crm_demo.util.NotFoundException;
import dev.bachi.crm_demo.util.ReferencedWarning;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class OpportunityService {

    private final OpportunityRepository opportunityRepository;
    private final AccountRepository accountRepository;
    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    private final ActivityRelationRepository activityRelationRepository;
    private final OpportunityProductRepository opportunityProductRepository;

    public OpportunityService(final OpportunityRepository opportunityRepository,
            final AccountRepository accountRepository, final ContactRepository contactRepository,
            final UserRepository userRepository,
            final ActivityRelationRepository activityRelationRepository,
            final OpportunityProductRepository opportunityProductRepository) {
        this.opportunityRepository = opportunityRepository;
        this.accountRepository = accountRepository;
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
        this.activityRelationRepository = activityRelationRepository;
        this.opportunityProductRepository = opportunityProductRepository;
    }

    public List<OpportunityDTO> findAll() {
        final List<Opportunity> opportunities = opportunityRepository.findAll(Sort.by("opportunityId"));
        return opportunities.stream()
                .map(opportunity -> mapToDTO(opportunity, new OpportunityDTO()))
                .toList();
    }

    public OpportunityDTO get(final UUID opportunityId) {
        return opportunityRepository.findById(opportunityId)
                .map(opportunity -> mapToDTO(opportunity, new OpportunityDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final OpportunityDTO opportunityDTO) {
        final Opportunity opportunity = new Opportunity();
        mapToEntity(opportunityDTO, opportunity);
        return opportunityRepository.save(opportunity).getOpportunityId();
    }

    public void update(final UUID opportunityId, final OpportunityDTO opportunityDTO) {
        final Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(opportunityDTO, opportunity);
        opportunityRepository.save(opportunity);
    }

    public void delete(final UUID opportunityId) {
        opportunityRepository.deleteById(opportunityId);
    }

    private OpportunityDTO mapToDTO(final Opportunity opportunity,
            final OpportunityDTO opportunityDTO) {
        opportunityDTO.setOpportunityId(opportunity.getOpportunityId());
        opportunityDTO.setOpportunityName(opportunity.getOpportunityName());
        opportunityDTO.setAmount(opportunity.getAmount());
        opportunityDTO.setStage(opportunity.getStage());
        opportunityDTO.setCloseDate(opportunity.getCloseDate());
        opportunityDTO.setCreatedAt(opportunity.getCreatedAt());
        opportunityDTO.setUpdatedAt(opportunity.getUpdatedAt());
        opportunityDTO.setAccount(opportunity.getAccount() == null ? null : opportunity.getAccount().getAccountId());
        opportunityDTO.setContact(opportunity.getContact() == null ? null : opportunity.getContact().getContactId());
        opportunityDTO.setOwner(opportunity.getOwner() == null ? null : opportunity.getOwner().getUserId());
        return opportunityDTO;
    }

    private Opportunity mapToEntity(final OpportunityDTO opportunityDTO,
            final Opportunity opportunity) {
        opportunity.setOpportunityName(opportunityDTO.getOpportunityName());
        opportunity.setAmount(opportunityDTO.getAmount());
        opportunity.setStage(opportunityDTO.getStage());
        opportunity.setCloseDate(opportunityDTO.getCloseDate());
        opportunity.setCreatedAt(opportunityDTO.getCreatedAt());
        opportunity.setUpdatedAt(opportunityDTO.getUpdatedAt());
        final Account account = opportunityDTO.getAccount() == null ? null : accountRepository.findById(opportunityDTO.getAccount())
                .orElseThrow(() -> new NotFoundException("account not found"));
        opportunity.setAccount(account);
        final Contact contact = opportunityDTO.getContact() == null ? null : contactRepository.findById(opportunityDTO.getContact())
                .orElseThrow(() -> new NotFoundException("contact not found"));
        opportunity.setContact(contact);
        final User owner = opportunityDTO.getOwner() == null ? null : userRepository.findById(opportunityDTO.getOwner())
                .orElseThrow(() -> new NotFoundException("owner not found"));
        opportunity.setOwner(owner);
        return opportunity;
    }

    public ReferencedWarning getReferencedWarning(final UUID opportunityId) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(NotFoundException::new);
        final ActivityRelation opportunityActivityRelation = activityRelationRepository.findFirstByOpportunity(opportunity);
        if (opportunityActivityRelation != null) {
            referencedWarning.setKey("opportunity.activityRelation.opportunity.referenced");
            referencedWarning.addParam(opportunityActivityRelation.getId());
            return referencedWarning;
        }
        final OpportunityProduct opportunityOpportunityProduct = opportunityProductRepository.findFirstByOpportunity(opportunity);
        if (opportunityOpportunityProduct != null) {
            referencedWarning.setKey("opportunity.opportunityProduct.opportunity.referenced");
            referencedWarning.addParam(opportunityOpportunityProduct.getQuantity());
            return referencedWarning;
        }
        return null;
    }

    public Map<UUID, String> getOpportunityValues() {
        return opportunityRepository.findAll(Sort.by("opportunityId"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Opportunity::getOpportunityId, Opportunity::getOpportunityName));
    }

}
