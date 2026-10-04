package dev.bachi.crm_demo.util;

import java.util.ArrayList;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ReferencedWarning {

    private String key = null;
    private ArrayList<Object> params = new ArrayList<>();

    public void addParam(final Object param) {
        params.add(param);
    }

    public String toMessage() {
        String message = key;
        if (!params.isEmpty()) {
            message += "," + params.stream()
                    .map(Object::toString)
                    .collect(Collectors.joining(","));
        }
        return message;
    }

    /**
     * Human-readable variant of the warning for API consumers, e.g.
     * key {@code user.account.owner.referenced} becomes
     * "Cannot delete User: still referenced by Account (as owner)".
     * Falls back to {@link #toMessage()} for unknown key shapes.
     */
    public String toUserMessage() {
        if (key != null) {
            final String[] parts = key.split("\\.");
            if (parts.length == 4 && parts[3].equals("referenced")) {
                return "Cannot delete " + capitalize(parts[0]) + ": still referenced by "
                        + capitalize(parts[1]) + " (as " + parts[2] + ")";
            }
        }
        return toMessage();
    }

    private static String capitalize(final String word) {
        if (word == null || word.isEmpty()) {
            return word;
        }
        return Character.toUpperCase(word.charAt(0)) + word.substring(1);
    }

}
