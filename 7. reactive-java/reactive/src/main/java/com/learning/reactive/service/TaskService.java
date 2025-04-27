package com.learning.reactive.service;

import com.learning.reactive.exception.ResourceNotFoundException;
import com.learning.reactive.model.Task;
import com.learning.reactive.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class TaskService {
    private final TaskRepository taskRepository;

    TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public Mono<Task> createTask(Task task){
        log.info("Creating new task: {}", task.getTitle());
        return taskRepository.save(task);
    }

    public Flux<Task> getAllTasks(){
        log.info("Fetching all tasks");
        return taskRepository.findAll();
    }

    public Mono<Task> getTaskById(Long id){
        log.info("Fetching task with id: {}", id);
        return taskRepository.findById(id).switchIfEmpty(Mono.error(new ResourceNotFoundException("Task not found with id:"+id)));
    }

    public Mono<Void> deleteTask(Long id){
        log.info("Deleting task: {}", id);
        return  taskRepository.deleteById(id).switchIfEmpty(Mono.error(new ResourceNotFoundException("Task not found with id:"+id)));
    }

    public Mono<Task> updateTask(Long id, Task updatedTask){
        log.info("Updating task with id: {}",id);
        return taskRepository.findById(id)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Task not found with id: "+id)))
                .flatMap(existingTask -> {
                    existingTask.setTitle(updatedTask.getTitle());
                    existingTask.setDescription(updatedTask.getDescription());
                    existingTask.setCompleted(updatedTask.getCompleted());
                    return taskRepository.save(existingTask);
                });
    }
}
