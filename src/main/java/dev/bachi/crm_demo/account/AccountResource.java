package dev.bachi.crm_demo.account;

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
@RequestMapping(value = "/api/accounts", produces = MediaType.APPLICATION_JSON_VALUE)
public class AccountResource {

    private final AccountService accountService;
    private final UserService userService;

    public AccountResource(final AccountService accountService, final UserService userService) {
        this.accountService = accountService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<AccountDTO>> getAllAccounts() {
        return ResponseEntity.ok(accountService.findAll());
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountDTO> getAccount(
            @PathVariable(name = "accountId") final UUID accountId) {
        return ResponseEntity.ok(accountService.get(accountId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createAccount(@RequestBody @Valid final AccountDTO accountDTO) {
        final UUID createdAccountId = accountService.create(accountDTO);
        return new ResponseEntity<>(createdAccountId, HttpStatus.CREATED);
    }

    @PutMapping("/{accountId}")
    public ResponseEntity<UUID> updateAccount(
            @PathVariable(name = "accountId") final UUID accountId,
            @RequestBody @Valid final AccountDTO accountDTO) {
        accountService.update(accountId, accountDTO);
        return ResponseEntity.ok(accountId);
    }

    @DeleteMapping("/{accountId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteAccount(
            @PathVariable(name = "accountId") final UUID accountId) {
        final ReferencedWarning referencedWarning = accountService.getReferencedWarning(accountId);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        accountService.delete(accountId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ownerValues")
    public ResponseEntity<Map<UUID, String>> getOwnerValues() {
        return ResponseEntity.ok(userService.getUserValues());
    }

}
