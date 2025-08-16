package dev.bachi.crm_demo.contact;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ContactDTO {

    private UUID contactId;

    @NotNull
    @Size(max = 50)
    private String firstName;

    @NotNull
    @Size(max = 50)
    private String lastName;

    @Size(max = 100)
    private String email;

    @Size(max = 20)
    private String phone;

    @Size(max = 100)
    private String jobTitle;

    @JsonProperty("isLead")
    private Boolean isLead;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String metadata;

    private UUID account;

    private UUID owner;

}
