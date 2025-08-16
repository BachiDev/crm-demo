package dev.bachi.crm_demo.activity;

import dev.bachi.crm_demo.user.UserService;
import dev.bachi.crm_demo.util.ReferencedException;
import dev.bachi.crm_demo.util.ReferencedWarning;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/activities", produces = MediaType.APPLICATION_JSON_VALUE)
public class ActivityResource {

    private final ActivityService activityService;
    private final UserService userService;

    public ActivityResource(final ActivityService activityService, final UserService userService) {
        this.activityService = activityService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<ActivityDTO>> getAllActivities() {
        return ResponseEntity.ok(activityService.findAll());
    }

    @GetMapping("/{activityId}")
    public ResponseEntity<ActivityDTO> getActivity(
            @PathVariable(name = "activityId") final UUID activityId) {
        return ResponseEntity.ok(activityService.get(activityId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createActivity(@RequestBody @Valid final ActivityDTO activityDTO) {
        final UUID createdActivityId = activityService.create(activityDTO);
        return new ResponseEntity<>(createdActivityId, HttpStatus.CREATED);
    }

    @PutMapping("/{activityId}")
    public ResponseEntity<UUID> updateActivity(
            @PathVariable(name = "activityId") final UUID activityId,
            @RequestBody @Valid final ActivityDTO activityDTO) {
        activityService.update(activityId, activityDTO);
        return ResponseEntity.ok(activityId);
    }

    @DeleteMapping("/{activityId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteActivity(
            @PathVariable(name = "activityId") final UUID activityId) {
        final ReferencedWarning referencedWarning = activityService.getReferencedWarning(activityId);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        activityService.delete(activityId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ownerValues")
    public ResponseEntity<Map<UUID, String>> getOwnerValues() {
        return ResponseEntity.ok(userService.getUserValues());
    }

}
