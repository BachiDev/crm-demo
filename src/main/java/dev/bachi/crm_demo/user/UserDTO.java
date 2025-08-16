package dev.bachi.crm_demo.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {

    private UUID userId;

    @NotNull
    @Size(max = 50)
    private String username;

    @NotNull
    @Size(max = 100)
    private String email;

    @NotNull
    @Size(max = 255)
    private String passwordHash;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

}
