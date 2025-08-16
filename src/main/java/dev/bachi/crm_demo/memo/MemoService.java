package dev.bachi.crm_demo.memo;

import dev.bachi.crm_demo.user.User;
import dev.bachi.crm_demo.user.UserRepository;
import dev.bachi.crm_demo.util.NotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class MemoService {

    private final MemoRepository memoRepository;
    private final UserRepository userRepository;

    public MemoService(final MemoRepository memoRepository, final UserRepository userRepository) {
        this.memoRepository = memoRepository;
        this.userRepository = userRepository;
    }

    public List<MemoDTO> findAll() {
        final List<Memo> memoes = memoRepository.findAll(Sort.by("memoId"));
        return memoes.stream()
                .map(memo -> mapToDTO(memo, new MemoDTO()))
                .toList();
    }

    public MemoDTO get(final UUID memoId) {
        return memoRepository.findById(memoId)
                .map(memo -> mapToDTO(memo, new MemoDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final MemoDTO memoDTO) {
        final Memo memo = new Memo();
        mapToEntity(memoDTO, memo);
        return memoRepository.save(memo).getMemoId();
    }

    public void update(final UUID memoId, final MemoDTO memoDTO) {
        final Memo memo = memoRepository.findById(memoId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(memoDTO, memo);
        memoRepository.save(memo);
    }

    public void delete(final UUID memoId) {
        memoRepository.deleteById(memoId);
    }

    private MemoDTO mapToDTO(final Memo memo, final MemoDTO memoDTO) {
        memoDTO.setMemoId(memo.getMemoId());
        memoDTO.setRelatedToType(memo.getRelatedToType());
        memoDTO.setRelatedToId(memo.getRelatedToId());
        memoDTO.setMemoText(memo.getMemoText());
        memoDTO.setCreatedAt(memo.getCreatedAt());
        memoDTO.setUser(memo.getUser() == null ? null : memo.getUser().getUserId());
        return memoDTO;
    }

    private Memo mapToEntity(final MemoDTO memoDTO, final Memo memo) {
        memo.setRelatedToType(memoDTO.getRelatedToType());
        memo.setRelatedToId(memoDTO.getRelatedToId());
        memo.setMemoText(memoDTO.getMemoText());
        memo.setCreatedAt(memoDTO.getCreatedAt());
        final User user = memoDTO.getUser() == null ? null : userRepository.findById(memoDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        memo.setUser(user);
        return memo;
    }

}
