package dev.bachi.crm_demo.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductDTO {

    private UUID productId;

    @NotNull
    @Size(max = 255)
    private String productName;

    @NotNull
    @Size(max = 50)
    private String sku;

    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "75.08")
    private BigDecimal price;

    private String description;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

}
