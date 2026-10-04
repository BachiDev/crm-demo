package dev.bachi.crm_demo.account;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
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
class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ContactRepository contactRepository;
    @Mock
    private OpportunityRepository opportunityRepository;
    @Mock
    private ActivityRelationRepository activityRelationRepository;

    @InjectMocks
    private AccountService accountService;

    private Account account(final UUID id, final String name) {
        final Account account = new Account();
        account.setAccountId(id);
        account.setAccountName(name);
        return account;
    }

    @Test
    void findAllMapsDtos() {
        when(accountRepository.findAll(Sort.by("accountId")))
                .thenReturn(List.of(account(UUID.randomUUID(), "TechCorp")));

        assertThat(accountService.findAll()).extracting(AccountDTO::getAccountName)
                .containsExactly("TechCorp");
    }

    @Test
    void findAllPagedSearchesOnQuery() {
        final Page<Account> page = new PageImpl<>(List.of(account(UUID.randomUUID(), "TechCorp")));
        when(accountRepository.findByAccountNameContainingIgnoreCaseOrIndustryContainingIgnoreCaseOrWebsiteContainingIgnoreCaseOrCityContainingIgnoreCase(
                "tech", "tech", "tech", "tech", PageRequest.of(0, 10))).thenReturn(page);

        final Page<AccountDTO> result = accountService.findAllPaged(PageRequest.of(0, 10), "tech");

        assertThat(result.getTotalElements()).isEqualTo(1);
    }

    @Test
    void getMissingThrowsNotFound() {
        final UUID id = UUID.randomUUID();
        when(accountRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountService.get(id)).isInstanceOf(NotFoundException.class);
    }

    @Test
    void createPersistsAndReturnsId() {
        final UUID id = UUID.randomUUID();
        final AccountDTO dto = new AccountDTO();
        dto.setAccountName("TechCorp");
        when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> {
            final Account saved = invocation.getArgument(0);
            saved.setAccountId(id);
            return saved;
        });

        assertThat(accountService.create(dto)).isEqualTo(id);
    }

    @Test
    void deleteRemovesById() {
        final UUID id = UUID.randomUUID();

        accountService.delete(id);

        verify(accountRepository).deleteById(id);
    }

    @Test
    void getReferencedWarningWhenContactExists() {
        final UUID id = UUID.randomUUID();
        final Account account = account(id, "TechCorp");
        when(accountRepository.findById(id)).thenReturn(Optional.of(account));
        final Contact contact = new Contact();
        contact.setContactId(UUID.randomUUID());
        when(contactRepository.findFirstByAccount(account)).thenReturn(contact);

        final ReferencedWarning warning = accountService.getReferencedWarning(id);

        assertThat(warning).isNotNull();
        assertThat(warning.getKey()).isEqualTo("account.contact.account.referenced");
    }

    @Test
    void getReferencedWarningWhenNothingReferences() {
        final UUID id = UUID.randomUUID();
        when(accountRepository.findById(id)).thenReturn(Optional.of(account(id, "TechCorp")));

        assertThat(accountService.getReferencedWarning(id)).isNull();
    }

}
