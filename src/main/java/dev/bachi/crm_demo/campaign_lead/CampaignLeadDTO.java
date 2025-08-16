package dev.bachi.crm_demo.campaign_lead;

import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CampaignLeadDTO {

    @Size(max = 50)
    @CampaignLeadStatusValid
    private String status;

    private OffsetDateTime createdAt;

    private UUID campaign;

    private UUID contact;

}
