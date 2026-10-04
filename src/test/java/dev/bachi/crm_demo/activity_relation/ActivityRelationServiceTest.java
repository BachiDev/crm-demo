package dev.bachi.crm_demo.activity_relation;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity.ActivityRepository;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
import dev.bachi.crm_demo.util.NotFoundException;
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
class ActivityRelationServiceTest {

    @Mock
    private ActivityRelationRepository activityRelationRepository;
    @Mock
    private ActivityRepository activityRepository;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private ContactRepository contactRepository;
    @Mock
    private OpportunityRepository opportunityRepository;

    @InjectMocks
    private ActivityRelationService activityRelationService;

    private ActivityRelation relation(final Long id) {
        final ActivityRelation relation = new ActivityRelation();
        relation.setId(id);
        return relation;
    }

    @Test
    void findAllMapsDtos() {
        when(activityRelationRepository.findAll(Sort.by("id")))
                .thenReturn(List.of(relation(10001L)));

        assertThat(activityRelationService.findAll()).extracting(ActivityRelationDTO::getId)
                .containsExactly(10001L);
    }

    @Test
    void findAllPagedSearchesOnQuery() {
        final Page<ActivityRelation> page = new PageImpl<>(List.of(relation(10001L)));
        when(activityRelationRepository.search("sarah", PageRequest.of(0, 10))).thenReturn(page);

        final Page<ActivityRelationDTO> result =
                activityRelationService.findAllPaged(PageRequest.of(0, 10), "sarah");

        assertThat(result.getTotalElements()).isEqualTo(1);
    }

    @Test
    void getMissingThrowsNotFound() {
        when(activityRelationRepository.findById(99999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> activityRelationService.get(99999L)).isInstanceOf(NotFoundException.class);
    }

    @Test
    void createPersistsAndReturnsId() {
        final UUID accountId = UUID.randomUUID();
        final ActivityRelationDTO dto = new ActivityRelationDTO();
        dto.setAccount(accountId);
        final dev.bachi.crm_demo.account.Account account = new dev.bachi.crm_demo.account.Account();
        account.setAccountId(accountId);
        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(activityRelationRepository.save(any(ActivityRelation.class))).thenAnswer(invocation -> {
            final ActivityRelation saved = invocation.getArgument(0);
            saved.setId(10003L);
            return saved;
        });

        assertThat(activityRelationService.create(dto)).isEqualTo(10003L);
    }

    @Test
    void deleteRemovesById() {
        activityRelationService.delete(10001L);

        verify(activityRelationRepository).deleteById(10001L);
    }

    @Test
    void countDelegatesToRepository() {
        when(activityRelationRepository.count()).thenReturn(2L);

        assertThat(activityRelationService.count()).isEqualTo(2L);
    }

}
