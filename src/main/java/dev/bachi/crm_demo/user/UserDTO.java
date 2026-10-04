package dev.bachi.crm_demo.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {

    /** Validation group for creation: the password must be provided once, never again. */
    public interface Create {
    }

    private UUID userId;

    @NotNull
    @Size(max = 50)
    private String username;

    @NotNull
    @Size(max = 100)
    private String email;

    // Write-only (never serialized) + only required on creation: updates may
    // omit it to keep the existing hash (see UserService.mapToEntity).
    @NotNull(groups = Create.class)
    @Size(max = 255)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String passwordHash;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

}
