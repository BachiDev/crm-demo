package dev.bachi.crm_demo.activity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import dev.bachi.crm_demo.activity_relation.ActivityRelation;
import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
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
class ActivityServiceTest {

    @Mock
    private ActivityRepository activityRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ActivityRelationRepository activityRelationRepository;

    @InjectMocks
    private ActivityService activityService;

    private Activity activity(final UUID id, final String subject) {
        final Activity activity = new Activity();
        activity.setActivityId(id);
        activity.setSubject(subject);
        activity.setActivityType("call");
        activity.setStatus("planned");
        return activity;
    }

    @Test
    void findAllMapsDtos() {
        when(activityRepository.findAll(Sort.by("activityId")))
                .thenReturn(List.of(activity(UUID.randomUUID(), "Call Sarah")));

        assertThat(activityService.findAll()).extracting(ActivityDTO::getSubject)
                .containsExactly("Call Sarah");
    }

    @Test
    void findAllPagedSearchesOnQuery() {
        final Page<Activity> page = new PageImpl<>(List.of(activity(UUID.randomUUID(), "Call Sarah")));
        when(activityRepository.findBySubjectContainingIgnoreCaseOrActivityTypeContainingIgnoreCaseOrStatusContainingIgnoreCase(
                "call", "call", "call", PageRequest.of(0, 10))).thenReturn(page);

        assertThat(activityService.findAllPaged(PageRequest.of(0, 10), "call").getTotalElements()).isEqualTo(1);
    }

    @Test
    void getMissingThrowsNotFound() {
        final UUID id = UUID.randomUUID();
        when(activityRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> activityService.get(id)).isInstanceOf(NotFoundException.class);
    }

    @Test
    void createPersistsAndReturnsId() {
        final UUID id = UUID.randomUUID();
        final ActivityDTO dto = new ActivityDTO();
        dto.setSubject("Call Sarah");
        dto.setActivityType("call");
        dto.setStatus("planned");
        when(activityRepository.save(any(Activity.class))).thenAnswer(invocation -> {
            final Activity saved = invocation.getArgument(0);
            saved.setActivityId(id);
            return saved;
        });

        assertThat(activityService.create(dto)).isEqualTo(id);
    }

    @Test
    void deleteRemovesById() {
        final UUID id = UUID.randomUUID();

        activityService.delete(id);

        verify(activityRepository).deleteById(id);
    }

    @Test
    void getReferencedWarningWhenRelationExists() {
        final UUID id = UUID.randomUUID();
        final Activity activity = activity(id, "Call Sarah");
        when(activityRepository.findById(id)).thenReturn(Optional.of(activity));
        final ActivityRelation relation = new ActivityRelation();
        relation.setId(10001L);
        when(activityRelationRepository.findFirstByActivity(activity)).thenReturn(relation);

        final ReferencedWarning warning = activityService.getReferencedWarning(id);

        assertThat(warning).isNotNull();
        assertThat(warning.getKey()).isEqualTo("activity.activityRelation.activity.referenced");
    }

    @Test
    void getReferencedWarningWhenNothingReferences() {
        final UUID id = UUID.randomUUID();
        when(activityRepository.findById(id)).thenReturn(Optional.of(activity(id, "Call Sarah")));

        assertThat(activityService.getReferencedWarning(id)).isNull();
    }

}
