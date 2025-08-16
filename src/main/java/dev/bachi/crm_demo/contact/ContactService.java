package dev.bachi.crm_demo.contact;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity_relation.ActivityRelation;
import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
import dev.bachi.crm_demo.campaign_lead.CampaignLead;
import dev.bachi.crm_demo.campaign_lead.CampaignLeadRepository;
import dev.bachi.crm_demo.opportunity.Opportunity;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
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
public class ContactService {

    private final ContactRepository contactRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final OpportunityRepository opportunityRepository;
    private final ActivityRelationRepository activityRelationRepository;
    private final CampaignLeadRepository campaignLeadRepository;

    public ContactService(final ContactRepository contactRepository,
            final AccountRepository accountRepository, final UserRepository userRepository,
            final OpportunityRepository opportunityRepository,
            final ActivityRelationRepository activityRelationRepository,
            final CampaignLeadRepository campaignLeadRepository) {
        this.contactRepository = contactRepository;
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.opportunityRepository = opportunityRepository;
        this.activityRelationRepository = activityRelationRepository;
        this.campaignLeadRepository = campaignLeadRepository;
    }

    public List<ContactDTO> findAll() {
        final List<Contact> contacts = contactRepository.findAll(Sort.by("contactId"));
        return contacts.stream()
                .map(contact -> mapToDTO(contact, new ContactDTO()))
                .toList();
    }

    public ContactDTO get(final UUID contactId) {
        return contactRepository.findById(contactId)
                .map(contact -> mapToDTO(contact, new ContactDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final ContactDTO contactDTO) {
        final Contact contact = new Contact();
        mapToEntity(contactDTO, contact);
        return contactRepository.save(contact).getContactId();
    }

    public void update(final UUID contactId, final ContactDTO contactDTO) {
        final Contact contact = contactRepository.findById(contactId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(contactDTO, contact);
        contactRepository.save(contact);
    }

    public void delete(final UUID contactId) {
        contactRepository.deleteById(contactId);
    }

    private ContactDTO mapToDTO(final Contact contact, final ContactDTO contactDTO) {
        contactDTO.setContactId(contact.getContactId());
        contactDTO.setFirstName(contact.getFirstName());
        contactDTO.setLastName(contact.getLastName());
        contactDTO.setEmail(contact.getEmail());
        contactDTO.setPhone(contact.getPhone());
        contactDTO.setJobTitle(contact.getJobTitle());
        contactDTO.setIsLead(contact.getIsLead());
        contactDTO.setCreatedAt(contact.getCreatedAt());
        contactDTO.setUpdatedAt(contact.getUpdatedAt());
        contactDTO.setMetadata(contact.getMetadata());
        contactDTO.setAccount(contact.getAccount() == null ? null : contact.getAccount().getAccountId());
        contactDTO.setOwner(contact.getOwner() == null ? null : contact.getOwner().getUserId());
        return contactDTO;
    }

    private Contact mapToEntity(final ContactDTO contactDTO, final Contact contact) {
        contact.setFirstName(contactDTO.getFirstName());
        contact.setLastName(contactDTO.getLastName());
        contact.setEmail(contactDTO.getEmail());
        contact.setPhone(contactDTO.getPhone());
        contact.setJobTitle(contactDTO.getJobTitle());
        contact.setIsLead(contactDTO.getIsLead());
        contact.setCreatedAt(contactDTO.getCreatedAt());
        contact.setUpdatedAt(contactDTO.getUpdatedAt());
        contact.setMetadata(contactDTO.getMetadata());
        final Account account = contactDTO.getAccount() == null ? null : accountRepository.findById(contactDTO.getAccount())
                .orElseThrow(() -> new NotFoundException("account not found"));
        contact.setAccount(account);
        final User owner = contactDTO.getOwner() == null ? null : userRepository.findById(contactDTO.getOwner())
                .orElseThrow(() -> new NotFoundException("owner not found"));
        contact.setOwner(owner);
        return contact;
    }

    public ReferencedWarning getReferencedWarning(final UUID contactId) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Contact contact = contactRepository.findById(contactId)
                .orElseThrow(NotFoundException::new);
        final Opportunity contactOpportunity = opportunityRepository.findFirstByContact(contact);
        if (contactOpportunity != null) {
            referencedWarning.setKey("contact.opportunity.contact.referenced");
            referencedWarning.addParam(contactOpportunity.getOpportunityId());
            return referencedWarning;
        }
        final ActivityRelation contactActivityRelation = activityRelationRepository.findFirstByContact(contact);
        if (contactActivityRelation != null) {
            referencedWarning.setKey("contact.activityRelation.contact.referenced");
            referencedWarning.addParam(contactActivityRelation.getId());
            return referencedWarning;
        }
        final CampaignLead contactCampaignLead = campaignLeadRepository.findFirstByContact(contact);
        if (contactCampaignLead != null) {
            referencedWarning.setKey("contact.campaignLead.contact.referenced");
            referencedWarning.addParam(contactCampaignLead.getStatus());
            return referencedWarning;
        }
        return null;
    }

    public Map<UUID, String> getContactValues() {
        return contactRepository.findAll(Sort.by("contactId"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Contact::getContactId, Contact::getFirstName));
    }

}
