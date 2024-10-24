package io.brendo.taskapi.repository;

import io.brendo.taskapi.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskRepo extends JpaRepository<Task, String> {
    Optional<Task> findById(String id);

}
