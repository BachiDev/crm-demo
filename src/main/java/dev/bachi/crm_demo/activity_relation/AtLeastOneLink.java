package dev.bachi.crm_demo.activity_relation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * An activity relation without a single link (activity, account, contact or
 * opportunity) is meaningless — it would render as an empty row. Rejects such
 * payloads with a 400 before they reach the database.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AtLeastOneLinkValidator.class)
@Documented
public @interface AtLeastOneLink {

    String message() default "At least one link must be set (activity, account, contact or opportunity)";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
