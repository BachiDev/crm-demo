package dev.bachi.crm_demo.util;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.UUID;
import org.junit.jupiter.api.Test;


class ReferencedWarningTest {

    @Test
    void toUserMessageFormatsKnownKey() {
        final ReferencedWarning warning = new ReferencedWarning();
        warning.setKey("user.account.owner.referenced");
        warning.addParam(UUID.fromString("11111111-1111-1111-1111-111111111111"));

        assertThat(warning.toUserMessage())
                .isEqualTo("Cannot delete User: still referenced by Account (as owner)");
    }

    @Test
    void toUserMessageFallsBackForUnknownKeyShape() {
        final ReferencedWarning warning = new ReferencedWarning();
        warning.setKey("something-unexpected");

        assertThat(warning.toUserMessage()).isEqualTo("something-unexpected");
    }

    @Test
    void toMessageKeepsMachineReadableFormat() {
        final ReferencedWarning warning = new ReferencedWarning();
        warning.setKey("user.account.owner.referenced");
        warning.addParam("abc");

        assertThat(warning.toMessage()).isEqualTo("user.account.owner.referenced,abc");
    }

}
