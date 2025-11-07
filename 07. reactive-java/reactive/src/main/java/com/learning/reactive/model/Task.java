package com.learning.reactive.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table
public class Task {

    @Id
    private Long id;
    private String title;
    private String description;
    private Boolean completed = false;
}
