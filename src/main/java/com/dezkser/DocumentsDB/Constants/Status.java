package com.dezkser.DocumentsDB.Constants;

/**
 * These are the available status that user can have
 */
public enum Status {
    ACTIVE("ACTIVE"),
    INACTIVE("INACTIVE"),
    FIRST_ACCESS("FIRST ACCESS");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Status fromString(String value) {
        for (Status status : Status.values()) {
            if (status.getValue().equals(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No enum constant for value " + value);
    }
}

