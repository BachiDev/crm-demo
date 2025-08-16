package dev.bachi.crm_demo.activity;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ActivityDTO {

    private UUID activityId;

    @NotNull
    @Size(max = 50)
    private String activityType;

    @NotNull
    @Size(max = 255)
    private String subject;

    private OffsetDateTime dueDate;

    @NotNull
    @Size(max = 50)
    private String status;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private UUID owner;

}
