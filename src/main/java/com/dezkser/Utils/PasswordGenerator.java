package com.dezkser.Utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.List;

public class PasswordGenerator {
    private static final Logger LOGGER = LoggerFactory.getLogger(PasswordGenerator.class);
    private static final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
    private static final String OTHER_CHAR = "!@#$%&*()_+-=[]?";
    private static final String PASSWORD_ALLOW_BASE = CHAR_LOWER + CHAR_UPPER + NUMBER + OTHER_CHAR;
    private final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final List<String> COMMON_WORDS = Arrays.asList(
            "pruebas", "temporal","contraseña","password",
            "qwer","admin"
    );
    private static final Integer MAX_PASSWORD_SIZE = 32;
    private static final Integer MIN_PASSWORD_SIZE = 8;
    private final Integer defaultPasswordSize;

    public PasswordGenerator(Integer pDefaultPasswordSize) {
        this.defaultPasswordSize = pDefaultPasswordSize;
        trace("Creating a new PasswordGenerator with default size of: {}",pDefaultPasswordSize);
    }

    public String generateSecurePassword(String pUsername) {
        String password = generateRandomPassword(defaultPasswordSize);
        trace("Creating new password for: {}", pUsername);

        while (!isPasswordSecure(password, pUsername)) {
            password = generateRandomPassword(defaultPasswordSize);
        }

        trace("Secure password generated: {}", password);
        return password;
    }
    private String generateRandomPassword(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int rndCharAt = SECURE_RANDOM.nextInt(PASSWORD_ALLOW_BASE.length());
            char rndChar = PASSWORD_ALLOW_BASE.charAt(rndCharAt);
            sb.append(rndChar);
        }
        return sb.toString();
    }

    /**
     * This method allows to determinate if the password is secure, depending on the rules
     * @param pPassword the password that will be verified if is secure
     * @param pUsername the username to verify that the password not contains the username
     * @return true if the password matches all the rules
     */
    public boolean isPasswordSecure(String pPassword, String pUsername) {
        if(pPassword.length()>MAX_PASSWORD_SIZE||pPassword.length()<MIN_PASSWORD_SIZE){
            return false;
        }

        if (pPassword.contains(pUsername)) {
            return false;
        }

        for (String word : COMMON_WORDS) {
            if (pPassword.toLowerCase().contains(word.toLowerCase())) {
                return false;
            }
        }

        if (!pPassword.matches(".*[A-Z].*")) {
            return false;
        }

        if (!pPassword.matches(".*[0-9].*")) {
            return false;
        }

        return true;
    }
    private static void trace(String message, Object... args){
        if(LOGGER.isTraceEnabled()){
            LOGGER.trace(message,args);
        }
    }
}
