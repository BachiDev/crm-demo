package dev.bachi.crm_demo.campaign;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CampaignDTO {

    private UUID campaignId;

    @NotNull
    @Size(max = 255)
    private String campaignName;

    @Size(max = 50)
    private String campaignType;

    private OffsetDateTime startDate;

    private OffsetDateTime endDate;

    @Size(max = 20)
    private String status;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private UUID owner;

}
