package com.senac.geekOpolis.service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// Esta classe cria as instancias do BCryptPasswordEncoder que 
// podem ser injetadas em outras partes do aplicativo onde a segurança é necessária
@Configuration
public class SecurityConfig {
    
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
