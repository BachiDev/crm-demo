package dev.bachi.crm_demo.account;

import dev.bachi.crm_demo.activity_relation.ActivityRelation;
import dev.bachi.crm_demo.activity_relation.ActivityRelationRepository;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.opportunity.Opportunity;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
import dev.bachi.crm_demo.user.User;
import dev.bachi.crm_demo.user.UserRepository;
import dev.bachi.crm_demo.util.CustomCollectors;
import dev.bachi.crm_demo.util.NotFoundException;
import dev.bachi.crm_demo.util.ReferencedWarning;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final ContactRepository contactRepository;
    private final OpportunityRepository opportunityRepository;
    private final ActivityRelationRepository activityRelationRepository;

    public AccountService(final AccountRepository accountRepository,
            final UserRepository userRepository, final ContactRepository contactRepository,
            final OpportunityRepository opportunityRepository,
            final ActivityRelationRepository activityRelationRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.contactRepository = contactRepository;
        this.opportunityRepository = opportunityRepository;
        this.activityRelationRepository = activityRelationRepository;
    }

    public List<AccountDTO> findAll() {
        final List<Account> accounts = accountRepository.findAll(Sort.by("accountId"));
        return accounts.stream()
                .map(account -> mapToDTO(account, new AccountDTO()))
                .toList();
    }

    public AccountDTO get(final UUID accountId) {
        return accountRepository.findById(accountId)
                .map(account -> mapToDTO(account, new AccountDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final AccountDTO accountDTO) {
        final Account account = new Account();
        mapToEntity(accountDTO, account);
        return accountRepository.save(account).getAccountId();
    }

    public void update(final UUID accountId, final AccountDTO accountDTO) {
        final Account account = accountRepository.findById(accountId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(accountDTO, account);
        accountRepository.save(account);
    }

    public void delete(final UUID accountId) {
        accountRepository.deleteById(accountId);
    }

    private AccountDTO mapToDTO(final Account account, final AccountDTO accountDTO) {
        accountDTO.setAccountId(account.getAccountId());
        accountDTO.setAccountName(account.getAccountName());
        accountDTO.setIndustry(account.getIndustry());
        accountDTO.setWebsite(account.getWebsite());
        accountDTO.setPhone(account.getPhone());
        accountDTO.setAddressLine1(account.getAddressLine1());
        accountDTO.setCity(account.getCity());
        accountDTO.setState(account.getState());
        accountDTO.setPostalCode(account.getPostalCode());
        accountDTO.setCountry(account.getCountry());
        accountDTO.setMetadata(account.getMetadata());
        accountDTO.setOwner(account.getOwner() == null ? null : account.getOwner().getUserId());
        return accountDTO;
    }

    private Account mapToEntity(final AccountDTO accountDTO, final Account account) {
        account.setAccountName(accountDTO.getAccountName());
        account.setIndustry(accountDTO.getIndustry());
        account.setWebsite(accountDTO.getWebsite());
        account.setPhone(accountDTO.getPhone());
        account.setAddressLine1(accountDTO.getAddressLine1());
        account.setCity(accountDTO.getCity());
        account.setState(accountDTO.getState());
        account.setPostalCode(accountDTO.getPostalCode());
        account.setCountry(accountDTO.getCountry());
        account.setMetadata(accountDTO.getMetadata());
        final User owner = accountDTO.getOwner() == null ? null : userRepository.findById(accountDTO.getOwner())
                .orElseThrow(() -> new NotFoundException("owner not found"));
        account.setOwner(owner);
        return account;
    }

    public ReferencedWarning getReferencedWarning(final UUID accountId) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Account account = accountRepository.findById(accountId)
                .orElseThrow(NotFoundException::new);
        final Contact accountContact = contactRepository.findFirstByAccount(account);
        if (accountContact != null) {
            referencedWarning.setKey("account.contact.account.referenced");
            referencedWarning.addParam(accountContact.getContactId());
            return referencedWarning;
        }
        final Opportunity accountOpportunity = opportunityRepository.findFirstByAccount(account);
        if (accountOpportunity != null) {
            referencedWarning.setKey("account.opportunity.account.referenced");
            referencedWarning.addParam(accountOpportunity.getOpportunityId());
            return referencedWarning;
        }
        final ActivityRelation accountActivityRelation = activityRelationRepository.findFirstByAccount(account);
        if (accountActivityRelation != null) {
            referencedWarning.setKey("account.activityRelation.account.referenced");
            referencedWarning.addParam(accountActivityRelation.getId());
            return referencedWarning;
        }
        return null;
    }

    public Map<UUID, String> getAccountValues() {
        return accountRepository.findAll(Sort.by("accountId"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Account::getAccountId, Account::getAccountName));
    }

}
