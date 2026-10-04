package dev.bachi.crm_demo.opportunity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity_relation.ActivityRelation;
import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.user.UserRepository;
import dev.bachi.crm_demo.util.NotFoundException;
import dev.bachi.crm_demo.util.ReferencedWarning;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


@ExtendWith(MockitoExtension.class)
class OpportunityServiceTest {

    @Mock
    private OpportunityRepository opportunityRepository;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private ContactRepository contactRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ActivityRelationRepository activityRelationRepository;

    @InjectMocks
    private OpportunityService opportunityService;

    private Opportunity opportunity(final UUID id, final String name) {
        final Opportunity opportunity = new Opportunity();
        opportunity.setOpportunityId(id);
        opportunity.setOpportunityName(name);
        opportunity.setStage("negotiation");
        return opportunity;
    }

    @Test
    void findAllMapsDtos() {
        when(opportunityRepository.findAll(Sort.by("opportunityId")))
                .thenReturn(List.of(opportunity(UUID.randomUUID(), "Upgrade")));

        assertThat(opportunityService.findAll()).extracting(OpportunityDTO::getOpportunityName)
                .containsExactly("Upgrade");
    }

    @Test
    void findAllPagedSearchesOnQuery() {
        final Page<Opportunity> page = new PageImpl<>(List.of(opportunity(UUID.randomUUID(), "Upgrade")));
        when(opportunityRepository.findByOpportunityNameContainingIgnoreCaseOrStageContainingIgnoreCase(
                "neg", "neg", PageRequest.of(0, 10))).thenReturn(page);

        assertThat(opportunityService.findAllPaged(PageRequest.of(0, 10), "neg").getTotalElements()).isEqualTo(1);
    }

    @Test
    void getMissingThrowsNotFound() {
        final UUID id = UUID.randomUUID();
        when(opportunityRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> opportunityService.get(id)).isInstanceOf(NotFoundException.class);
    }

    @Test
    void createPersistsAndReturnsId() {
        final UUID id = UUID.randomUUID();
        final OpportunityDTO dto = new OpportunityDTO();
        dto.setOpportunityName("Upgrade");
        dto.setStage("negotiation");
        when(opportunityRepository.save(any(Opportunity.class))).thenAnswer(invocation -> {
            final Opportunity saved = invocation.getArgument(0);
            saved.setOpportunityId(id);
            return saved;
        });

        assertThat(opportunityService.create(dto)).isEqualTo(id);
    }

    @Test
    void deleteRemovesById() {
        final UUID id = UUID.randomUUID();

        opportunityService.delete(id);

        verify(opportunityRepository).deleteById(id);
    }

    @Test
    void getReferencedWarningWhenRelationExists() {
        final UUID id = UUID.randomUUID();
        final Opportunity opportunity = opportunity(id, "Upgrade");
        when(opportunityRepository.findById(id)).thenReturn(Optional.of(opportunity));
        final ActivityRelation relation = new ActivityRelation();
        relation.setId(10001L);
        when(activityRelationRepository.findFirstByOpportunity(opportunity)).thenReturn(relation);

        final ReferencedWarning warning = opportunityService.getReferencedWarning(id);

        assertThat(warning).isNotNull();
        assertThat(warning.getKey()).isEqualTo("opportunity.activityRelation.opportunity.referenced");
    }

    @Test
    void getReferencedWarningWhenNothingReferences() {
        final UUID id = UUID.randomUUID();
        when(opportunityRepository.findById(id)).thenReturn(Optional.of(opportunity(id, "Upgrade")));

        assertThat(opportunityService.getReferencedWarning(id)).isNull();
    }

}
