package dev.bachi.crm_demo.opportunity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OpportunityDTO {

    private UUID opportunityId;

    @NotNull
    @Size(max = 255)
    private String opportunityName;

    @Digits(integer = 15, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "92.08")
    private BigDecimal amount;

    @NotNull
    @Size(max = 50)
    private String stage;

    private LocalDate closeDate;

    private UUID account;

    private UUID contact;

    private UUID owner;

}
