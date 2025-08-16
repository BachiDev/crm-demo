package dev.bachi.crm_demo.user;

import dev.bachi.crm_demo.account.Account;
import dev.bachi.crm_demo.account.AccountRepository;
import dev.bachi.crm_demo.activity.Activity;
import dev.bachi.crm_demo.activity.ActivityRepository;
import dev.bachi.crm_demo.campaign.Campaign;
import dev.bachi.crm_demo.campaign.CampaignRepository;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.memo.Memo;
import dev.bachi.crm_demo.memo.MemoRepository;
import dev.bachi.crm_demo.opportunity.Opportunity;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
import dev.bachi.crm_demo.util.CustomCollectors;
import dev.bachi.crm_demo.util.NotFoundException;
import dev.bachi.crm_demo.util.ReferencedWarning;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final ContactRepository contactRepository;
    private final OpportunityRepository opportunityRepository;
    private final ActivityRepository activityRepository;
    private final MemoRepository memoRepository;
    private final CampaignRepository campaignRepository;

    public UserService(final UserRepository userRepository,
            final AccountRepository accountRepository, final ContactRepository contactRepository,
            final OpportunityRepository opportunityRepository,
            final ActivityRepository activityRepository, final MemoRepository memoRepository,
            final CampaignRepository campaignRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.contactRepository = contactRepository;
        this.opportunityRepository = opportunityRepository;
        this.activityRepository = activityRepository;
        this.memoRepository = memoRepository;
        this.campaignRepository = campaignRepository;
    }

    public List<UserDTO> findAll() {
        final List<User> users = userRepository.findAll(Sort.by("userId"));
        return users.stream()
                .map(user -> mapToDTO(user, new UserDTO()))
                .toList();
    }

    public UserDTO get(final UUID userId) {
        return userRepository.findById(userId)
                .map(user -> mapToDTO(user, new UserDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final UserDTO userDTO) {
        final User user = new User();
        mapToEntity(userDTO, user);
        return userRepository.save(user).getUserId();
    }

    public void update(final UUID userId, final UserDTO userDTO) {
        final User user = userRepository.findById(userId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void delete(final UUID userId) {
        userRepository.deleteById(userId);
    }

    private UserDTO mapToDTO(final User user, final UserDTO userDTO) {
        userDTO.setUserId(user.getUserId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPasswordHash(user.getPasswordHash());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        return userDTO;
    }

    private User mapToEntity(final UserDTO userDTO, final User user) {
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPasswordHash(userDTO.getPasswordHash());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());
        return user;
    }

    public ReferencedWarning getReferencedWarning(final UUID userId) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final User user = userRepository.findById(userId)
                .orElseThrow(NotFoundException::new);
        final Account ownerAccount = accountRepository.findFirstByOwner(user);
        if (ownerAccount != null) {
            referencedWarning.setKey("user.account.owner.referenced");
            referencedWarning.addParam(ownerAccount.getAccountId());
            return referencedWarning;
        }
        final Contact ownerContact = contactRepository.findFirstByOwner(user);
        if (ownerContact != null) {
            referencedWarning.setKey("user.contact.owner.referenced");
            referencedWarning.addParam(ownerContact.getContactId());
            return referencedWarning;
        }
        final Opportunity ownerOpportunity = opportunityRepository.findFirstByOwner(user);
        if (ownerOpportunity != null) {
            referencedWarning.setKey("user.opportunity.owner.referenced");
            referencedWarning.addParam(ownerOpportunity.getOpportunityId());
            return referencedWarning;
        }
        final Activity ownerActivity = activityRepository.findFirstByOwner(user);
        if (ownerActivity != null) {
            referencedWarning.setKey("user.activity.owner.referenced");
            referencedWarning.addParam(ownerActivity.getActivityId());
            return referencedWarning;
        }
        final Memo userMemo = memoRepository.findFirstByUser(user);
        if (userMemo != null) {
            referencedWarning.setKey("user.memo.user.referenced");
            referencedWarning.addParam(userMemo.getMemoId());
            return referencedWarning;
        }
        final Campaign ownerCampaign = campaignRepository.findFirstByOwner(user);
        if (ownerCampaign != null) {
            referencedWarning.setKey("user.campaign.owner.referenced");
            referencedWarning.addParam(ownerCampaign.getCampaignId());
            return referencedWarning;
        }
        return null;
    }

    public Map<UUID, String> getUserValues() {
        return userRepository.findAll(Sort.by("userId"))
                .stream()
                .collect(CustomCollectors.toSortedMap(User::getUserId, User::getUsername));
    }

}
