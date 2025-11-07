package com.learning.reactive.controller;

import com.learning.reactive.dto.TaskRequest;
import com.learning.reactive.model.Task;
import com.learning.reactive.repository.TaskRepository;
import com.learning.reactive.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;

    TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @PostMapping
    public Mono<Task> createTask(@Valid @RequestBody TaskRequest taskRequest) {
        Task task = new Task();
        task.setCompleted(taskRequest.isCompleted());
        task.setDescription(taskRequest.getDescription());
        task.setTitle(taskRequest.getTitle());
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Mono<Task> updateTask(@PathVariable Long id,@Valid @RequestBody TaskRequest taskRequest){
        Task task = new Task();
        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setCompleted(taskRequest.isCompleted());
        return taskService.updateTask(id, task);
    }

    @GetMapping
    public Flux<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Mono<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteTask(@PathVariable Long id) {
        return taskService.deleteTask(id);
    }
}
