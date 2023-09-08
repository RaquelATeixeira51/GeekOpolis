package com.senac.geekOpolis.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;

@RestController
public class TokenController {

    private static final String CHAVE_SECRETA = "jwt-geekOpolis-validation";

    @GetMapping("/api/token/valid")
    public boolean isTokenValid(@RequestParam String token) {
        try {
            // Verifica a validade do token
            Jwts.parser().setSigningKey(CHAVE_SECRETA).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            return false;
        } catch (SignatureException | MalformedJwtException e) {
            return false;
        }
    }
}
