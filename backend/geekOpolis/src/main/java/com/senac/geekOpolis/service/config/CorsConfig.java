package com.senac.geekOpolis.service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    // arquivo para definir quais origens tem permissão para acessar os recursos.
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") //Qualquer url está sujeita a configuração CORS 
                        .allowedMethods("*") //Permite os metodos https das origens da linha de baixo
                        .allowedOrigins("*") //Todas as origens podem acessar os recursos
                        .allowedHeaders("*"); //Permite que todos os cabeçalhos sejam incluídos nas solicitações
            }
        };
    }
}
