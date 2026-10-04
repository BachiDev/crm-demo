package dev.bachi.crm_demo.activity;

import dev.bachi.crm_demo.activity_relation.ActivityRelation;
import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
import dev.bachi.crm_demo.user.User;
import dev.bachi.crm_demo.user.UserRepository;
import dev.bachi.crm_demo.util.CustomCollectors;
import dev.bachi.crm_demo.util.NotFoundException;
import dev.bachi.crm_demo.util.ReferencedWarning;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final ActivityRelationRepository activityRelationRepository;

    public ActivityService(final ActivityRepository activityRepository,
            final UserRepository userRepository,
            final ActivityRelationRepository activityRelationRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.activityRelationRepository = activityRelationRepository;
    }

    public List<ActivityDTO> findAll() {
        final List<Activity> activities = activityRepository.findAll(Sort.by("activityId"));
        return activities.stream()
                .map(activity -> mapToDTO(activity, new ActivityDTO()))
                .toList();
    }

    public Page<ActivityDTO> findAllPaged(final Pageable pageable, final String query) {
        final String q = query == null ? null : query.strip();
        final Page<Activity> page = (q == null || q.isEmpty())
                ? activityRepository.findAll(pageable)
                : activityRepository.findBySubjectContainingIgnoreCaseOrActivityTypeContainingIgnoreCaseOrStatusContainingIgnoreCase(q, q, q, pageable);
        return page.map(activity -> mapToDTO(activity, new ActivityDTO()));
    }

    public long count() {
        return activityRepository.count();
    }

    public ActivityDTO get(final UUID activityId) {
        return activityRepository.findById(activityId)
                .map(activity -> mapToDTO(activity, new ActivityDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final ActivityDTO activityDTO) {
        final Activity activity = new Activity();
        mapToEntity(activityDTO, activity);
        return activityRepository.save(activity).getActivityId();
    }

    public void update(final UUID activityId, final ActivityDTO activityDTO) {
        final Activity activity = activityRepository.findById(activityId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(activityDTO, activity);
        activityRepository.save(activity);
    }

    public void delete(final UUID activityId) {
        activityRepository.deleteById(activityId);
    }

    private ActivityDTO mapToDTO(final Activity activity, final ActivityDTO activityDTO) {
        activityDTO.setActivityId(activity.getActivityId());
        activityDTO.setActivityType(activity.getActivityType());
        activityDTO.setSubject(activity.getSubject());
        activityDTO.setDueDate(activity.getDueDate());
        activityDTO.setStatus(activity.getStatus());
        activityDTO.setOwner(activity.getOwner() == null ? null : activity.getOwner().getUserId());
        return activityDTO;
    }

    private Activity mapToEntity(final ActivityDTO activityDTO, final Activity activity) {
        activity.setActivityType(activityDTO.getActivityType());
        activity.setSubject(activityDTO.getSubject());
        activity.setDueDate(activityDTO.getDueDate());
        activity.setStatus(activityDTO.getStatus());
        final User owner = activityDTO.getOwner() == null ? null : userRepository.findById(activityDTO.getOwner())
                .orElseThrow(() -> new NotFoundException("owner not found"));
        activity.setOwner(owner);
        return activity;
    }

    public ReferencedWarning getReferencedWarning(final UUID activityId) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Activity activity = activityRepository.findById(activityId)
                .orElseThrow(NotFoundException::new);
        final ActivityRelation activityActivityRelation = activityRelationRepository.findFirstByActivity(activity);
        if (activityActivityRelation != null) {
            referencedWarning.setKey("activity.activityRelation.activity.referenced");
            referencedWarning.addParam(activityActivityRelation.getId());
            return referencedWarning;
        }
        return null;
    }

    public Map<UUID, String> getActivityValues() {
        return activityRepository.findAll(Sort.by("activityId"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Activity::getActivityId, Activity::getActivityType));
    }

}
