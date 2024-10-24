package io.brendo.taskapi.service;

import io.brendo.taskapi.entity.Task;
import io.brendo.taskapi.repository.TaskRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepo taskRepo;

    public Page<Task> getAllTasks(int page, int size) {
        return taskRepo.findAll(PageRequest.of(page, size, Sort.by("title")));
    }

    public Task getTask(String id) {
        return taskRepo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task createTask(Task task) {
        return taskRepo.save(task);
    }

    public void deleteTask(Task task) {
        taskRepo.delete(task);
    }
}
