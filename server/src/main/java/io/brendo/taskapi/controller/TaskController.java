package io.brendo.taskapi.controller;

import io.brendo.taskapi.entity.Task;
import io.brendo.taskapi.service.TaskService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
@AllArgsConstructor
@Slf4j
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @GetMapping
    public ResponseEntity<Page<Task>> getContacts(@RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(taskService.getAllTasks(page, size));
    }

    @GetMapping("{id}")
    public ResponseEntity<Task> getTask(@PathVariable(value = "id") String id) {
        return ResponseEntity.ok().body(taskService.getTask(id));
    }

}
