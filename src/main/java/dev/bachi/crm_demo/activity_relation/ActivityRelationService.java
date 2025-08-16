package dev.bachi.crm_demo.activity_relation;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity.Activity;
import dev.bachi.crm_demo.activity.ActivityRepository;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.opportunity.Opportunity;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
import dev.bachi.crm_demo.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ActivityRelationService {

    private final ActivityRelationRepository activityRelationRepository;
    private final ActivityRepository activityRepository;
    private final AccountRepository accountRepository;
    private final ContactRepository contactRepository;
    private final OpportunityRepository opportunityRepository;

    public ActivityRelationService(final ActivityRelationRepository activityRelationRepository,
            final ActivityRepository activityRepository, final AccountRepository accountRepository,
            final ContactRepository contactRepository,
            final OpportunityRepository opportunityRepository) {
        this.activityRelationRepository = activityRelationRepository;
        this.activityRepository = activityRepository;
        this.accountRepository = accountRepository;
        this.contactRepository = contactRepository;
        this.opportunityRepository = opportunityRepository;
    }

    public List<ActivityRelationDTO> findAll() {
        final List<ActivityRelation> activityRelations = activityRelationRepository.findAll(Sort.by("id"));
        return activityRelations.stream()
                .map(activityRelation -> mapToDTO(activityRelation, new ActivityRelationDTO()))
                .toList();
    }

    public ActivityRelationDTO get(final Long id) {
        return activityRelationRepository.findById(id)
                .map(activityRelation -> mapToDTO(activityRelation, new ActivityRelationDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final ActivityRelationDTO activityRelationDTO) {
        final ActivityRelation activityRelation = new ActivityRelation();
        mapToEntity(activityRelationDTO, activityRelation);
        return activityRelationRepository.save(activityRelation).getId();
    }

    public void update(final Long id, final ActivityRelationDTO activityRelationDTO) {
        final ActivityRelation activityRelation = activityRelationRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(activityRelationDTO, activityRelation);
        activityRelationRepository.save(activityRelation);
    }

    public void delete(final Long id) {
        activityRelationRepository.deleteById(id);
    }

    private ActivityRelationDTO mapToDTO(final ActivityRelation activityRelation,
            final ActivityRelationDTO activityRelationDTO) {
        activityRelationDTO.setId(activityRelation.getId());
        activityRelationDTO.setActivity(activityRelation.getActivity() == null ? null : activityRelation.getActivity().getActivityId());
        activityRelationDTO.setAccount(activityRelation.getAccount() == null ? null : activityRelation.getAccount().getAccountId());
        activityRelationDTO.setContact(activityRelation.getContact() == null ? null : activityRelation.getContact().getContactId());
        activityRelationDTO.setOpportunity(activityRelation.getOpportunity() == null ? null : activityRelation.getOpportunity().getOpportunityId());
        return activityRelationDTO;
    }

    private ActivityRelation mapToEntity(final ActivityRelationDTO activityRelationDTO,
            final ActivityRelation activityRelation) {
        final Activity activity = activityRelationDTO.getActivity() == null ? null : activityRepository.findById(activityRelationDTO.getActivity())
                .orElseThrow(() -> new NotFoundException("activity not found"));
        activityRelation.setActivity(activity);
        final Account account = activityRelationDTO.getAccount() == null ? null : accountRepository.findById(activityRelationDTO.getAccount())
                .orElseThrow(() -> new NotFoundException("account not found"));
        activityRelation.setAccount(account);
        final Contact contact = activityRelationDTO.getContact() == null ? null : contactRepository.findById(activityRelationDTO.getContact())
                .orElseThrow(() -> new NotFoundException("contact not found"));
        activityRelation.setContact(contact);
        final Opportunity opportunity = activityRelationDTO.getOpportunity() == null ? null : opportunityRepository.findById(activityRelationDTO.getOpportunity())
                .orElseThrow(() -> new NotFoundException("opportunity not found"));
        activityRelation.setOpportunity(opportunity);
        return activityRelation;
    }

}
