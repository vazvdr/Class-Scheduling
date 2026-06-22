package com.class_project.backend_class.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    @Value("${BREVO_FROM_EMAIL}")
    private String fromEmail;

    @Value("${BREVO_FROM_NAME}")
    private String fromName;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String BREVO_URL = "https://api.brevo.com/v3/smtp/email";

    public void enviarEmailAgendamento(
            String para,
            String assunto,
            String conteudo) {

        try {

            System.out.println("\n========== INÍCIO ENVIO EMAIL AGENDAMENTO ==========");

            System.out.println("BREVO_URL: " + BREVO_URL);
            System.out.println("FROM_EMAIL: " + fromEmail);
            System.out.println("FROM_NAME: " + fromName);
            System.out.println("PARA: " + para);
            System.out.println("ASSUNTO: " + assunto);

            if (apiKey == null) {
                System.out.println("❌ BREVO_API_KEY está NULL");
            } else {
                System.out.println(
                        "API KEY (primeiros caracteres): "
                                + apiKey.substring(
                                        0,
                                        Math.min(10, apiKey.length()))
                                + "...");
            }

            Map<String, Object> body = new HashMap<>();
            Map<String, String> sender = new HashMap<>();
            Map<String, String> to = new HashMap<>();

            sender.put("email", fromEmail);
            sender.put("name", fromName);

            to.put("email", para);

            body.put("sender", sender);
            body.put("to", Collections.singletonList(to));
            body.put("subject", assunto);
            body.put("textContent", conteudo);

            System.out.println("BODY ENVIADO:");
            System.out.println(body);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", apiKey);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    BREVO_URL,
                    request,
                    String.class);

            System.out.println("✅ EMAIL ENVIADO COM SUCESSO");
            System.out.println("STATUS: " + response.getStatusCode());
            System.out.println("BODY RESPOSTA: " + response.getBody());

            System.out.println("========== FIM ENVIO EMAIL AGENDAMENTO ==========\n");

        } catch (HttpClientErrorException e) {

            System.out.println("\n========== ERRO BREVO ==========");
            System.out.println("STATUS HTTP: " + e.getStatusCode());
            System.out.println("STATUS CODE: " + e.getRawStatusCode());
            System.out.println("RESPOSTA BREVO:");
            System.out.println(e.getResponseBodyAsString());
            System.out.println("================================\n");

            throw new RuntimeException(
                    "Erro ao enviar email de agendamento",
                    e);

        } catch (Exception e) {

            System.out.println("\n========== ERRO GERAL ==========");
            e.printStackTrace();
            System.out.println("================================\n");

            throw new RuntimeException(
                    "Erro ao enviar email de agendamento",
                    e);
        }
    }

    public void enviarEmailRecuperarSenha(
            String para,
            String assunto,
            String conteudo) {

        try {

            System.out.println("\n========== INÍCIO ENVIO EMAIL RECUPERAÇÃO ==========");

            System.out.println("FROM_EMAIL: " + fromEmail);
            System.out.println("FROM_NAME: " + fromName);
            System.out.println("PARA: " + para);

            if (apiKey == null) {
                System.out.println("❌ BREVO_API_KEY está NULL");
            } else {
                System.out.println(
                        "API KEY (primeiros caracteres): "
                                + apiKey.substring(
                                        0,
                                        Math.min(10, apiKey.length()))
                                + "...");
            }

            Map<String, Object> body = new HashMap<>();
            Map<String, String> sender = new HashMap<>();
            Map<String, String> to = new HashMap<>();

            sender.put("email", fromEmail);
            sender.put("name", fromName);

            to.put("email", para);

            body.put("sender", sender);
            body.put("to", Collections.singletonList(to));
            body.put("subject", assunto);
            body.put("textContent", conteudo);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", apiKey);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    BREVO_URL,
                    request,
                    String.class);

            System.out.println("✅ EMAIL DE RECUPERAÇÃO ENVIADO");
            System.out.println("STATUS: " + response.getStatusCode());
            System.out.println("BODY RESPOSTA: " + response.getBody());

            System.out.println("========== FIM ENVIO EMAIL RECUPERAÇÃO ==========\n");

        } catch (HttpClientErrorException e) {

            System.out.println("\n========== ERRO BREVO ==========");
            System.out.println("STATUS HTTP: " + e.getStatusCode());
            System.out.println("STATUS CODE: " + e.getRawStatusCode());
            System.out.println("RESPOSTA BREVO:");
            System.out.println(e.getResponseBodyAsString());
            System.out.println("================================\n");

            throw new RuntimeException(
                    "Erro ao enviar email de recuperação de senha",
                    e);

        } catch (Exception e) {

            System.out.println("\n========== ERRO GERAL ==========");
            e.printStackTrace();
            System.out.println("================================\n");

            throw new RuntimeException(
                    "Erro ao enviar email de recuperação de senha",
                    e);
        }
    }
}