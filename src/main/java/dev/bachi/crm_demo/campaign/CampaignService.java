package dev.bachi.crm_demo.campaign;

import dev.bachi.crm_demo.user.User;
import dev.bachi.crm_demo.user.UserRepository;
import dev.bachi.crm_demo.util.NotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;

    public CampaignService(final CampaignRepository campaignRepository,
            final UserRepository userRepository) {
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
    }

    public List<CampaignDTO> findAll() {
        final List<Campaign> campaigns = campaignRepository.findAll(Sort.by("campaignId"));
        return campaigns.stream()
                .map(campaign -> mapToDTO(campaign, new CampaignDTO()))
                .toList();
    }

    public Page<CampaignDTO> findAllPaged(final Pageable pageable, final String query) {
        final String q = query == null ? null : query.strip();
        final Page<Campaign> page = (q == null || q.isEmpty())
                ? campaignRepository.findAll(pageable)
                : campaignRepository.findByCampaignNameContainingIgnoreCaseOrCampaignTypeContainingIgnoreCaseOrStatusContainingIgnoreCase(q, q, q, pageable);
        return page.map(campaign -> mapToDTO(campaign, new CampaignDTO()));
    }

    public long count() {
        return campaignRepository.count();
    }

    public CampaignDTO get(final UUID campaignId) {
        return campaignRepository.findById(campaignId)
                .map(campaign -> mapToDTO(campaign, new CampaignDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final CampaignDTO campaignDTO) {
        final Campaign campaign = new Campaign();
        mapToEntity(campaignDTO, campaign);
        return campaignRepository.save(campaign).getCampaignId();
    }

    public void update(final UUID campaignId, final CampaignDTO campaignDTO) {
        final Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(campaignDTO, campaign);
        campaignRepository.save(campaign);
    }

    public void delete(final UUID campaignId) {
        campaignRepository.deleteById(campaignId);
    }

    private CampaignDTO mapToDTO(final Campaign campaign, final CampaignDTO campaignDTO) {
        campaignDTO.setCampaignId(campaign.getCampaignId());
        campaignDTO.setCampaignName(campaign.getCampaignName());
        campaignDTO.setCampaignType(campaign.getCampaignType());
        campaignDTO.setStartDate(campaign.getStartDate());
        campaignDTO.setEndDate(campaign.getEndDate());
        campaignDTO.setStatus(campaign.getStatus());
        campaignDTO.setOwner(campaign.getOwner() == null ? null : campaign.getOwner().getUserId());
        return campaignDTO;
    }

    private Campaign mapToEntity(final CampaignDTO campaignDTO, final Campaign campaign) {
        campaign.setCampaignName(campaignDTO.getCampaignName());
        campaign.setCampaignType(campaignDTO.getCampaignType());
        campaign.setStartDate(campaignDTO.getStartDate());
        campaign.setEndDate(campaignDTO.getEndDate());
        campaign.setStatus(campaignDTO.getStatus());
        final User owner = campaignDTO.getOwner() == null ? null : userRepository.findById(campaignDTO.getOwner())
                .orElseThrow(() -> new NotFoundException("owner not found"));
        campaign.setOwner(owner);
        return campaign;
    }

}
