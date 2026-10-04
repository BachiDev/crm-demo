package dev.bachi.crm_demo.campaign;

import dev.bachi.crm_demo.user.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/campaigns", produces = MediaType.APPLICATION_JSON_VALUE)
public class CampaignResource {

    private final CampaignService campaignService;
    private final UserService userService;

    public CampaignResource(final CampaignService campaignService, final UserService userService) {
        this.campaignService = campaignService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<CampaignDTO>> getAllCampaigns() {
        return ResponseEntity.ok(campaignService.findAll());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<CampaignDTO>> getAllCampaignsPaged(
            @ParameterObject @PageableDefault(size = 50) final Pageable pageable) {
        return ResponseEntity.ok(campaignService.findAllPaged(pageable));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countCampaigns() {
        return ResponseEntity.ok(campaignService.count());
    }

    @GetMapping("/{campaignId}")
    public ResponseEntity<CampaignDTO> getCampaign(
            @PathVariable(name = "campaignId") final UUID campaignId) {
        return ResponseEntity.ok(campaignService.get(campaignId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createCampaign(@RequestBody @Valid final CampaignDTO campaignDTO) {
        final UUID createdCampaignId = campaignService.create(campaignDTO);
        return new ResponseEntity<>(createdCampaignId, HttpStatus.CREATED);
    }

    @PutMapping("/{campaignId}")
    public ResponseEntity<UUID> updateCampaign(
            @PathVariable(name = "campaignId") final UUID campaignId,
            @RequestBody @Valid final CampaignDTO campaignDTO) {
        campaignService.update(campaignId, campaignDTO);
        return ResponseEntity.ok(campaignId);
    }

    @DeleteMapping("/{campaignId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCampaign(
            @PathVariable(name = "campaignId") final UUID campaignId) {
        campaignService.delete(campaignId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ownerValues")
    public ResponseEntity<Map<UUID, String>> getOwnerValues() {
        return ResponseEntity.ok(userService.getUserValues());
    }

}
