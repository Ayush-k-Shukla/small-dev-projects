package com.learning.reactive.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskRequest {
    @NotBlank(message = "Title is mandatory")
    private String title;

    private String description;
    private boolean completed;
}
