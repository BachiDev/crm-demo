package dev.bachi.crm_demo.user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity.ActivityRepository;
import dev.bachi.crm_demo.campaign.CampaignRepository;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.memo.MemoRepository;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
import dev.bachi.crm_demo.util.NotFoundException;
import dev.bachi.crm_demo.util.ReferencedWarning;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;


@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private ContactRepository contactRepository;
    @Mock
    private OpportunityRepository opportunityRepository;
    @Mock
    private ActivityRepository activityRepository;
    @Mock
    private MemoRepository memoRepository;
    @Mock
    private CampaignRepository campaignRepository;

    @InjectMocks
    private UserService userService;

    private User user(final UUID id, final String username) {
        final User user = new User();
        user.setUserId(id);
        user.setUsername(username);
        user.setEmail(username + "@example.com");
        user.setPasswordHash("hash");
        return user;
    }

    @Test
    void getReturnsMappedDto() {
        final UUID id = UUID.randomUUID();
        when(userRepository.findById(id)).thenReturn(Optional.of(user(id, "jdoe")));

        final UserDTO dto = userService.get(id);

        assertThat(dto.getUserId()).isEqualTo(id);
        assertThat(dto.getUsername()).isEqualTo("jdoe");
    }

    @Test
    void getMissingThrowsNotFound() {
        final UUID id = UUID.randomUUID();
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.get(id)).isInstanceOf(NotFoundException.class);
    }

    @Test
    void createPersistsAndReturnsId() {
        final UUID id = UUID.randomUUID();
        final UserDTO dto = new UserDTO();
        dto.setUsername("jdoe");
        dto.setEmail("jdoe@example.com");
        dto.setPasswordHash("secret");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            final User saved = invocation.getArgument(0);
            saved.setUserId(id);
            return saved;
        });

        assertThat(userService.create(dto)).isEqualTo(id);
        final ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getPasswordHash()).isEqualTo("secret");
    }

    @Test
    void updateWithBlankPasswordKeepsExistingHash() {
        final UUID id = UUID.randomUUID();
        final User existing = user(id, "jdoe");
        existing.setPasswordHash("old-hash");
        when(userRepository.findById(id)).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        final UserDTO dto = new UserDTO();
        dto.setUsername("jdoe");
        dto.setEmail("jdoe@example.com");
        dto.setPasswordHash("");
        userService.update(id, dto);

        final ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getPasswordHash()).isEqualTo("old-hash");
    }

    @Test
    void updateWithNewPasswordOverwritesHash() {
        final UUID id = UUID.randomUUID();
        final User existing = user(id, "jdoe");
        existing.setPasswordHash("old-hash");
        when(userRepository.findById(id)).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        final UserDTO dto = new UserDTO();
        dto.setUsername("jdoe");
        dto.setEmail("jdoe@example.com");
        dto.setPasswordHash("new-hash");
        userService.update(id, dto);

        final ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getPasswordHash()).isEqualTo("new-hash");
    }

    @Test
    void findAllPagedMapsContent() {
        final Page<User> page = new PageImpl<>(List.of(user(UUID.randomUUID(), "jdoe"), user(UUID.randomUUID(), "asmith")));
        when(userRepository.findAll(PageRequest.of(0, 10))).thenReturn(page);

        final Page<UserDTO> result = userService.findAllPaged(PageRequest.of(0, 10), null);

        assertThat(result.getTotalElements()).isEqualTo(2);
        assertThat(result.getContent()).extracting(UserDTO::getUsername).containsExactly("jdoe", "asmith");
    }

    @Test
    void countDelegatesToRepository() {
        when(userRepository.count()).thenReturn(3L);

        assertThat(userService.count()).isEqualTo(3L);
    }

    @Test
    void getReferencedWarningWhenOwnedAccountExists() {
        final UUID id = UUID.randomUUID();
        final User owner = user(id, "jdoe");
        when(userRepository.findById(id)).thenReturn(Optional.of(owner));
        final Account account = new Account();
        account.setAccountId(UUID.randomUUID());
        when(accountRepository.findFirstByOwner(owner)).thenReturn(account);

        final ReferencedWarning warning = userService.getReferencedWarning(id);

        assertThat(warning).isNotNull();
        assertThat(warning.getKey()).isEqualTo("user.account.owner.referenced");
    }

    @Test
    void getReferencedWarningWhenNothingReferences() {
        final UUID id = UUID.randomUUID();
        final User owner = user(id, "jdoe");
        when(userRepository.findById(id)).thenReturn(Optional.of(owner));

        assertThat(userService.getReferencedWarning(id)).isNull();
    }

}
