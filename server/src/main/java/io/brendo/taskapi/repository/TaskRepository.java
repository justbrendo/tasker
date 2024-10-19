package io.brendo.taskapi.repository;

import io.brendo.taskapi.entity.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
    Task findById(long id);
}
