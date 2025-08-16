package dev.bachi.crm_demo.campaign_lead;

import dev.bachi.crm_demo.campaign.Campaign;
import dev.bachi.crm_demo.campaign.CampaignRepository;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.contact.ContactRepository;
import dev.bachi.crm_demo.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CampaignLeadService {

    private final CampaignLeadRepository campaignLeadRepository;
    private final CampaignRepository campaignRepository;
    private final ContactRepository contactRepository;

    public CampaignLeadService(final CampaignLeadRepository campaignLeadRepository,
            final CampaignRepository campaignRepository,
            final ContactRepository contactRepository) {
        this.campaignLeadRepository = campaignLeadRepository;
        this.campaignRepository = campaignRepository;
        this.contactRepository = contactRepository;
    }

    public List<CampaignLeadDTO> findAll() {
        final List<CampaignLead> campaignLeads = campaignLeadRepository.findAll(Sort.by("status"));
        return campaignLeads.stream()
                .map(campaignLead -> mapToDTO(campaignLead, new CampaignLeadDTO()))
                .toList();
    }

    public CampaignLeadDTO get(final String status) {
        return campaignLeadRepository.findById(status)
                .map(campaignLead -> mapToDTO(campaignLead, new CampaignLeadDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final CampaignLeadDTO campaignLeadDTO) {
        final CampaignLead campaignLead = new CampaignLead();
        mapToEntity(campaignLeadDTO, campaignLead);
        campaignLead.setStatus(campaignLeadDTO.getStatus());
        return campaignLeadRepository.save(campaignLead).getStatus();
    }

    public void update(final String status, final CampaignLeadDTO campaignLeadDTO) {
        final CampaignLead campaignLead = campaignLeadRepository.findById(status)
                .orElseThrow(NotFoundException::new);
        mapToEntity(campaignLeadDTO, campaignLead);
        campaignLeadRepository.save(campaignLead);
    }

    public void delete(final String status) {
        campaignLeadRepository.deleteById(status);
    }

    private CampaignLeadDTO mapToDTO(final CampaignLead campaignLead,
            final CampaignLeadDTO campaignLeadDTO) {
        campaignLeadDTO.setStatus(campaignLead.getStatus());
        campaignLeadDTO.setCreatedAt(campaignLead.getCreatedAt());
        campaignLeadDTO.setCampaign(campaignLead.getCampaign() == null ? null : campaignLead.getCampaign().getCampaignId());
        campaignLeadDTO.setContact(campaignLead.getContact() == null ? null : campaignLead.getContact().getContactId());
        return campaignLeadDTO;
    }

    private CampaignLead mapToEntity(final CampaignLeadDTO campaignLeadDTO,
            final CampaignLead campaignLead) {
        campaignLead.setCreatedAt(campaignLeadDTO.getCreatedAt());
        final Campaign campaign = campaignLeadDTO.getCampaign() == null ? null : campaignRepository.findById(campaignLeadDTO.getCampaign())
                .orElseThrow(() -> new NotFoundException("campaign not found"));
        campaignLead.setCampaign(campaign);
        final Contact contact = campaignLeadDTO.getContact() == null ? null : contactRepository.findById(campaignLeadDTO.getContact())
                .orElseThrow(() -> new NotFoundException("contact not found"));
        campaignLead.setContact(contact);
        return campaignLead;
    }

    public boolean statusExists(final String status) {
        return campaignLeadRepository.existsByStatusIgnoreCase(status);
    }

}
