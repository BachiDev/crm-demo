package dev.bachi.crm_demo.contact;

import dev.bachi.crm_demo.account.AccountService;
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
@RequestMapping(value = "/api/contacts", produces = MediaType.APPLICATION_JSON_VALUE)
public class ContactResource {

    private final ContactService contactService;
    private final AccountService accountService;
    private final UserService userService;

    public ContactResource(final ContactService contactService, final AccountService accountService,
            final UserService userService) {
        this.contactService = contactService;
        this.accountService = accountService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<ContactDTO>> getAllContacts() {
        return ResponseEntity.ok(contactService.findAll());
    }

    @GetMapping("/{contactId}")
    public ResponseEntity<ContactDTO> getContact(
            @PathVariable(name = "contactId") final UUID contactId) {
        return ResponseEntity.ok(contactService.get(contactId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createContact(@RequestBody @Valid final ContactDTO contactDTO) {
        final UUID createdContactId = contactService.create(contactDTO);
        return new ResponseEntity<>(createdContactId, HttpStatus.CREATED);
    }

    @PutMapping("/{contactId}")
    public ResponseEntity<UUID> updateContact(
            @PathVariable(name = "contactId") final UUID contactId,
            @RequestBody @Valid final ContactDTO contactDTO) {
        contactService.update(contactId, contactDTO);
        return ResponseEntity.ok(contactId);
    }

    @DeleteMapping("/{contactId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteContact(
            @PathVariable(name = "contactId") final UUID contactId) {
        final ReferencedWarning referencedWarning = contactService.getReferencedWarning(contactId);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        contactService.delete(contactId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/accountValues")
    public ResponseEntity<Map<UUID, String>> getAccountValues() {
        return ResponseEntity.ok(accountService.getAccountValues());
    }

    @GetMapping("/ownerValues")
    public ResponseEntity<Map<UUID, String>> getOwnerValues() {
        return ResponseEntity.ok(userService.getUserValues());
    }

}
