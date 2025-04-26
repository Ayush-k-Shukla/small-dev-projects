package com.learning.reactive;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class Reactive {
    private Mono<String> testMono(){
        return Mono.justOrEmpty("hello").log();
    }

    private Flux<String> testFlux(){
        return Flux.just("hello","again","sdf","fds").log();
    }

    public static void main(String[] args){
        Reactive r = new Reactive();
//        r.testMono().subscribe(System.out::println);
        r.testFlux().subscribe(System.out::println);
    }
}
