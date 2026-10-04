package dev.bachi.crm_demo.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.bachi.crm_demo.util.ReferencedWarning;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


@WebMvcTest(UserResource.class)
class UserResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private UserDTO dto(final UUID id, final String username) {
        final UserDTO dto = new UserDTO();
        dto.setUserId(id);
        dto.setUsername(username);
        dto.setEmail(username + "@example.com");
        return dto;
    }

    @Test
    void getAllReturnsList() throws Exception {
        when(userService.findAll()).thenReturn(List.of(dto(UUID.randomUUID(), "jdoe")));

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("jdoe"))
                .andExpect(jsonPath("$[0].passwordHash").doesNotExist());
    }

    @Test
    void getPagedReturnsPage() throws Exception {
        when(userService.findAllPaged(eq(PageRequest.of(0, 10)), eq(null)))
                .thenReturn(new PageImpl<>(List.of(dto(UUID.randomUUID(), "jdoe")), PageRequest.of(0, 10), 1));

        mockMvc.perform(get("/api/users/paged").param("page", "0").param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    void countReturnsNumber() throws Exception {
        when(userService.count()).thenReturn(3L);

        mockMvc.perform(get("/api/users/count"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(3));
    }

    @Test
    void createValidReturns201() throws Exception {
        final UUID id = UUID.randomUUID();
        when(userService.create(any(UserDTO.class))).thenReturn(id);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"jdoe\",\"email\":\"jdoe@example.com\",\"passwordHash\":\"secret\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$").value(id.toString()));
    }

    @Test
    void createInvalidReturns400() throws Exception {
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":null,\"email\":\"x\",\"passwordHash\":\"y\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deleteBlockedByReferenceReturns409() throws Exception {
        final UUID id = UUID.randomUUID();
        final ReferencedWarning warning = new ReferencedWarning();
        warning.setKey("user.account.owner.referenced");
        warning.addParam(UUID.randomUUID());
        when(userService.getReferencedWarning(id)).thenReturn(warning);

        mockMvc.perform(delete("/api/users/" + id)).andExpect(status().isConflict());
    }

    @Test
    void deleteWithoutReferenceReturns204() throws Exception {
        final UUID id = UUID.randomUUID();
        when(userService.getReferencedWarning(id)).thenReturn(null);

        mockMvc.perform(delete("/api/users/" + id)).andExpect(status().isNoContent());
    }

}
