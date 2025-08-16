package dev.bachi.crm_demo.account;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AccountDTO {

    private UUID accountId;

    @NotNull
    @Size(max = 255)
    private String accountName;

    @Size(max = 100)
    private String industry;

    @Size(max = 255)
    private String website;

    @Size(max = 20)
    private String phone;

    @Size(max = 255)
    private String addressLine1;

    @Size(max = 100)
    private String city;

    @Size(max = 50)
    private String state;

    @Size(max = 20)
    private String postalCode;

    @Size(max = 100)
    private String country;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String metadata;

    private UUID owner;

}
