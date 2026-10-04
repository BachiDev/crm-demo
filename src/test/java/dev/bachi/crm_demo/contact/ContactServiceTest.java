package dev.bachi.crm_demo.contact;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
import dev.bachi.crm_demo.opportunity.Opportunity;
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
class ContactServiceTest {

    @Mock
    private ContactRepository contactRepository;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private OpportunityRepository opportunityRepository;
    @Mock
    private ActivityRelationRepository activityRelationRepository;

    @InjectMocks
    private ContactService contactService;

    private Contact contact(final UUID id, final String firstName) {
        final Contact contact = new Contact();
        contact.setContactId(id);
        contact.setFirstName(firstName);
        contact.setLastName("Doe");
        return contact;
    }

    @Test
    void findAllMapsDtos() {
        when(contactRepository.findAll(Sort.by("contactId")))
                .thenReturn(List.of(contact(UUID.randomUUID(), "Sarah")));

        assertThat(contactService.findAll()).extracting(ContactDTO::getFirstName)
                .containsExactly("Sarah");
    }

    @Test
    void findAllPagedSearchesOnQuery() {
        final Page<Contact> page = new PageImpl<>(List.of(contact(UUID.randomUUID(), "Sarah")));
        when(contactRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrJobTitleContainingIgnoreCase(
                "sarah", "sarah", "sarah", "sarah", PageRequest.of(0, 10))).thenReturn(page);

        assertThat(contactService.findAllPaged(PageRequest.of(0, 10), "sarah").getTotalElements()).isEqualTo(1);
    }

    @Test
    void getMissingThrowsNotFound() {
        final UUID id = UUID.randomUUID();
        when(contactRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> contactService.get(id)).isInstanceOf(NotFoundException.class);
    }

    @Test
    void createPersistsAndReturnsId() {
        final UUID id = UUID.randomUUID();
        final ContactDTO dto = new ContactDTO();
        dto.setFirstName("Sarah");
        dto.setLastName("Doe");
        when(contactRepository.save(any(Contact.class))).thenAnswer(invocation -> {
            final Contact saved = invocation.getArgument(0);
            saved.setContactId(id);
            return saved;
        });

        assertThat(contactService.create(dto)).isEqualTo(id);
    }

    @Test
    void deleteRemovesById() {
        final UUID id = UUID.randomUUID();

        contactService.delete(id);

        verify(contactRepository).deleteById(id);
    }

    @Test
    void getReferencedWarningWhenOpportunityExists() {
        final UUID id = UUID.randomUUID();
        final Contact contact = contact(id, "Sarah");
        when(contactRepository.findById(id)).thenReturn(Optional.of(contact));
        final Opportunity opportunity = new Opportunity();
        opportunity.setOpportunityId(UUID.randomUUID());
        when(opportunityRepository.findFirstByContact(contact)).thenReturn(opportunity);

        final ReferencedWarning warning = contactService.getReferencedWarning(id);

        assertThat(warning).isNotNull();
        assertThat(warning.getKey()).isEqualTo("contact.opportunity.contact.referenced");
    }

    @Test
    void getReferencedWarningWhenNothingReferences() {
        final UUID id = UUID.randomUUID();
        when(contactRepository.findById(id)).thenReturn(Optional.of(contact(id, "Sarah")));

        assertThat(contactService.getReferencedWarning(id)).isNull();
    }

}
