package com.learning.reactive.repository;

import com.learning.reactive.model.Task;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TaskRepository extends ReactiveCrudRepository<Task,Long> {
}
