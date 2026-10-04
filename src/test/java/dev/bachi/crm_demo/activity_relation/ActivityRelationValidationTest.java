package dev.bachi.crm_demo.activity_relation;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;


class ActivityRelationValidationTest {

    private final Validator validator =
            Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    void emptyRelationIsRejectedOnEveryLinkField() {
        final Set<ConstraintViolation<ActivityRelationDTO>> violations =
                validator.validate(new ActivityRelationDTO());

        assertThat(violations).hasSize(4);
        assertThat(violations.stream()
                .map(v -> v.getPropertyPath().toString())
                .collect(Collectors.toSet()))
                .containsExactlyInAnyOrder("activity", "account", "contact", "opportunity");
    }

    @Test
    void singleLinkIsEnough() {
        final ActivityRelationDTO dto = new ActivityRelationDTO();
        dto.setAccount(UUID.randomUUID());

        assertThat(validator.validate(dto)).isEmpty();
    }

}
