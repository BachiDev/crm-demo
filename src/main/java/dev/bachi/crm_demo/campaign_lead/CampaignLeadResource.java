package dev.bachi.crm_demo.campaign_lead;

import dev.bachi.crm_demo.campaign.CampaignService;
import dev.bachi.crm_demo.contact.ContactService;
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
@RequestMapping(value = "/api/campaignLeads", produces = MediaType.APPLICATION_JSON_VALUE)
public class CampaignLeadResource {

    private final CampaignLeadService campaignLeadService;
    private final CampaignService campaignService;
    private final ContactService contactService;

    public CampaignLeadResource(final CampaignLeadService campaignLeadService,
            final CampaignService campaignService, final ContactService contactService) {
        this.campaignLeadService = campaignLeadService;
        this.campaignService = campaignService;
        this.contactService = contactService;
    }

    @GetMapping
    public ResponseEntity<List<CampaignLeadDTO>> getAllCampaignLeads() {
        return ResponseEntity.ok(campaignLeadService.findAll());
    }

    @GetMapping("/{status}")
    public ResponseEntity<CampaignLeadDTO> getCampaignLead(
            @PathVariable(name = "status") final String status) {
        return ResponseEntity.ok(campaignLeadService.get(status));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createCampaignLead(
            @RequestBody @Valid final CampaignLeadDTO campaignLeadDTO) {
        final String createdStatus = campaignLeadService.create(campaignLeadDTO);
        return new ResponseEntity<>('"' + createdStatus + '"', HttpStatus.CREATED);
    }

    @PutMapping("/{status}")
    public ResponseEntity<String> updateCampaignLead(
            @PathVariable(name = "status") final String status,
            @RequestBody @Valid final CampaignLeadDTO campaignLeadDTO) {
        campaignLeadService.update(status, campaignLeadDTO);
        return ResponseEntity.ok('"' + status + '"');
    }

    @DeleteMapping("/{status}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCampaignLead(
            @PathVariable(name = "status") final String status) {
        campaignLeadService.delete(status);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/campaignValues")
    public ResponseEntity<Map<UUID, String>> getCampaignValues() {
        return ResponseEntity.ok(campaignService.getCampaignValues());
    }

    @GetMapping("/contactValues")
    public ResponseEntity<Map<UUID, String>> getContactValues() {
        return ResponseEntity.ok(contactService.getContactValues());
    }

}
