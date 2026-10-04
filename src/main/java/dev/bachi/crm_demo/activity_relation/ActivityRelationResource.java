package dev.bachi.crm_demo.activity_relation;

import dev.bachi.crm_demo.account.AccountService;
import dev.bachi.crm_demo.activity.ActivityService;
import dev.bachi.crm_demo.contact.ContactService;
import dev.bachi.crm_demo.opportunity.OpportunityService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Tag(name = "Activity Relations", description = "Links between activities and accounts, contacts, opportunities")
@RequestMapping(value = "/api/activityRelations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ActivityRelationResource {

    private final ActivityRelationService activityRelationService;
    private final ActivityService activityService;
    private final AccountService accountService;
    private final ContactService contactService;
    private final OpportunityService opportunityService;

    public ActivityRelationResource(final ActivityRelationService activityRelationService,
            final ActivityService activityService, final AccountService accountService,
            final ContactService contactService, final OpportunityService opportunityService) {
        this.activityRelationService = activityRelationService;
        this.activityService = activityService;
        this.accountService = accountService;
        this.contactService = contactService;
        this.opportunityService = opportunityService;
    }

    @GetMapping
    public ResponseEntity<List<ActivityRelationDTO>> getAllActivityRelations() {
        return ResponseEntity.ok(activityRelationService.findAll());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<ActivityRelationDTO>> getAllActivityRelationsPaged(
            @ParameterObject @PageableDefault(size = 50) final Pageable pageable,
            @RequestParam(required = false) final String q) {
        return ResponseEntity.ok(activityRelationService.findAllPaged(pageable, q));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countActivityRelations() {
        return ResponseEntity.ok(activityRelationService.count());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityRelationDTO> getActivityRelation(
            @PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(activityRelationService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createActivityRelation(
            @RequestBody @Valid final ActivityRelationDTO activityRelationDTO) {
        final Long createdId = activityRelationService.create(activityRelationDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateActivityRelation(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final ActivityRelationDTO activityRelationDTO) {
        activityRelationService.update(id, activityRelationDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteActivityRelation(@PathVariable(name = "id") final Long id) {
        activityRelationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/activityValues")
    public ResponseEntity<Map<UUID, String>> getActivityValues() {
        return ResponseEntity.ok(activityService.getActivityValues());
    }

    @GetMapping("/accountValues")
    public ResponseEntity<Map<UUID, String>> getAccountValues() {
        return ResponseEntity.ok(accountService.getAccountValues());
    }

    @GetMapping("/contactValues")
    public ResponseEntity<Map<UUID, String>> getContactValues() {
        return ResponseEntity.ok(contactService.getContactValues());
    }

    @GetMapping("/opportunityValues")
    public ResponseEntity<Map<UUID, String>> getOpportunityValues() {
        return ResponseEntity.ok(opportunityService.getOpportunityValues());
    }

}
