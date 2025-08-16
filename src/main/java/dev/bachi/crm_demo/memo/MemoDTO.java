package dev.bachi.crm_demo.memo;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class MemoDTO {

    private UUID memoId;

    @NotNull
    @Size(max = 50)
    private String relatedToType;

    @NotNull
    private UUID relatedToId;

    @NotNull
    private String memoText;

    private OffsetDateTime createdAt;

    private UUID user;

}
