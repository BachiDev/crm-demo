package dev.bachi.crm_demo.memo;

import dev.bachi.crm_demo.user.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/memos", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemoResource {

    private final MemoService memoService;
    private final UserService userService;

    public MemoResource(final MemoService memoService, final UserService userService) {
        this.memoService = memoService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<MemoDTO>> getAllMemos() {
        return ResponseEntity.ok(memoService.findAll());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<MemoDTO>> getAllMemosPaged(
            @ParameterObject @PageableDefault(size = 50) final Pageable pageable) {
        return ResponseEntity.ok(memoService.findAllPaged(pageable));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countMemos() {
        return ResponseEntity.ok(memoService.count());
    }

    @GetMapping("/{memoId}")
    public ResponseEntity<MemoDTO> getMemo(@PathVariable(name = "memoId") final UUID memoId) {
        return ResponseEntity.ok(memoService.get(memoId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createMemo(@RequestBody @Valid final MemoDTO memoDTO) {
        final UUID createdMemoId = memoService.create(memoDTO);
        return new ResponseEntity<>(createdMemoId, HttpStatus.CREATED);
    }

    @PutMapping("/{memoId}")
    public ResponseEntity<UUID> updateMemo(@PathVariable(name = "memoId") final UUID memoId,
            @RequestBody @Valid final MemoDTO memoDTO) {
        memoService.update(memoId, memoDTO);
        return ResponseEntity.ok(memoId);
    }

    @DeleteMapping("/{memoId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteMemo(@PathVariable(name = "memoId") final UUID memoId) {
        memoService.delete(memoId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/userValues")
    public ResponseEntity<Map<UUID, String>> getUserValues() {
        return ResponseEntity.ok(userService.getUserValues());
    }

}
