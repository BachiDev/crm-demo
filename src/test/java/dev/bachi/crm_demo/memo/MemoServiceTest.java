package dev.bachi.crm_demo.memo;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import dev.bachi.crm_demo.user.UserRepository;
import dev.bachi.crm_demo.util.NotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


@ExtendWith(MockitoExtension.class)
class MemoServiceTest {

    @Mock
    private MemoRepository memoRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MemoService memoService;

    private Memo memo(final UUID id, final String text) {
        final Memo memo = new Memo();
        memo.setMemoId(id);
        memo.setMemoText(text);
        memo.setRelatedToType("account");
        memo.setRelatedToId(UUID.randomUUID());
        return memo;
    }

    @Test
    void findAllMapsDtos() {
        when(memoRepository.findAll(Sort.by("memoId")))
                .thenReturn(List.of(memo(UUID.randomUUID(), "Call back")));

        assertThat(memoService.findAll()).extracting(MemoDTO::getMemoText)
                .containsExactly("Call back");
    }

    @Test
    void findAllPagedSearchesOnQuery() {
        final Page<Memo> page = new PageImpl<>(List.of(memo(UUID.randomUUID(), "Call back")));
        when(memoRepository.findByMemoTextContainingIgnoreCaseOrRelatedToTypeContainingIgnoreCase(
                "call", "call", PageRequest.of(0, 10))).thenReturn(page);

        assertThat(memoService.findAllPaged(PageRequest.of(0, 10), "call").getTotalElements()).isEqualTo(1);
    }

    @Test
    void getMissingThrowsNotFound() {
        final UUID id = UUID.randomUUID();
        when(memoRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> memoService.get(id)).isInstanceOf(NotFoundException.class);
    }

    @Test
    void createPersistsAndReturnsId() {
        final UUID id = UUID.randomUUID();
        final MemoDTO dto = new MemoDTO();
        dto.setMemoText("Call back");
        dto.setRelatedToType("account");
        dto.setRelatedToId(UUID.randomUUID());
        when(memoRepository.save(any(Memo.class))).thenAnswer(invocation -> {
            final Memo saved = invocation.getArgument(0);
            saved.setMemoId(id);
            return saved;
        });

        assertThat(memoService.create(dto)).isEqualTo(id);
    }

    @Test
    void deleteRemovesById() {
        final UUID id = UUID.randomUUID();

        memoService.delete(id);

        verify(memoRepository).deleteById(id);
    }

    @Test
    void countDelegatesToRepository() {
        when(memoRepository.count()).thenReturn(2L);

        assertThat(memoService.count()).isEqualTo(2L);
    }

}
