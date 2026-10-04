package dev.bachi.crm_demo.opportunity;

import dev.bachi.crm_demo.account.AccountService;
import dev.bachi.crm_demo.contact.ContactService;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
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
@RequestMapping(value = "/api/opportunities", produces = MediaType.APPLICATION_JSON_VALUE)
public class OpportunityResource {

    private final OpportunityService opportunityService;
    private final AccountService accountService;
    private final ContactService contactService;
    private final UserService userService;

    public OpportunityResource(final OpportunityService opportunityService,
            final AccountService accountService, final ContactService contactService,
            final UserService userService) {
        this.opportunityService = opportunityService;
        this.accountService = accountService;
        this.contactService = contactService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<OpportunityDTO>> getAllOpportunities() {
        return ResponseEntity.ok(opportunityService.findAll());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<OpportunityDTO>> getAllOpportunitiesPaged(
            @ParameterObject @PageableDefault(size = 50) final Pageable pageable) {
        return ResponseEntity.ok(opportunityService.findAllPaged(pageable));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countOpportunities() {
        return ResponseEntity.ok(opportunityService.count());
    }

    @GetMapping("/{opportunityId}")
    public ResponseEntity<OpportunityDTO> getOpportunity(
            @PathVariable(name = "opportunityId") final UUID opportunityId) {
        return ResponseEntity.ok(opportunityService.get(opportunityId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createOpportunity(
            @RequestBody @Valid final OpportunityDTO opportunityDTO) {
        final UUID createdOpportunityId = opportunityService.create(opportunityDTO);
        return new ResponseEntity<>(createdOpportunityId, HttpStatus.CREATED);
    }

    @PutMapping("/{opportunityId}")
    public ResponseEntity<UUID> updateOpportunity(
            @PathVariable(name = "opportunityId") final UUID opportunityId,
            @RequestBody @Valid final OpportunityDTO opportunityDTO) {
        opportunityService.update(opportunityId, opportunityDTO);
        return ResponseEntity.ok(opportunityId);
    }

    @DeleteMapping("/{opportunityId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOpportunity(
            @PathVariable(name = "opportunityId") final UUID opportunityId) {
        final ReferencedWarning referencedWarning = opportunityService.getReferencedWarning(opportunityId);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        opportunityService.delete(opportunityId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/accountValues")
    public ResponseEntity<Map<UUID, String>> getAccountValues() {
        return ResponseEntity.ok(accountService.getAccountValues());
    }

    @GetMapping("/contactValues")
    public ResponseEntity<Map<UUID, String>> getContactValues() {
        return ResponseEntity.ok(contactService.getContactValues());
    }

    @GetMapping("/ownerValues")
    public ResponseEntity<Map<UUID, String>> getOwnerValues() {
        return ResponseEntity.ok(userService.getUserValues());
    }

}
