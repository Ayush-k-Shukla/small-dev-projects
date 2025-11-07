package com.learning.reactive.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RequestMapping("/api/public")
@RestController
@Slf4j
public class PublicController {
    @GetMapping("/health")
    Mono<String> getHealth(){
        log.info("Health check requested");
        return Mono.just("OK");
    }
}
