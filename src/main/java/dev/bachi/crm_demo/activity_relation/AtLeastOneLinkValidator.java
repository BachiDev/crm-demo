package dev.bachi.crm_demo.activity_relation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.List;


public class AtLeastOneLinkValidator implements ConstraintValidator<AtLeastOneLink, ActivityRelationDTO> {

    private static final List<String> LINK_FIELDS = List.of("activity", "account", "contact", "opportunity");

    private String message;

    @Override
    public void initialize(final AtLeastOneLink constraintAnnotation) {
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(final ActivityRelationDTO dto, final ConstraintValidatorContext context) {
        if (dto == null) {
            return true;
        }
        if (dto.getActivity() != null || dto.getAccount() != null
                || dto.getContact() != null || dto.getOpportunity() != null) {
            return true;
        }
        // Attach the violation to every link field so the form highlights all
        // four selects instead of failing silently on a class-level error.
        context.disableDefaultConstraintViolation();
        for (final String field : LINK_FIELDS) {
            context.buildConstraintViolationWithTemplate(message)
                    .addPropertyNode(field)
                    .addConstraintViolation();
        }
        return false;
    }

}
