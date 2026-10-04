package dev.bachi.crm_demo.activity_relation;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


@WebMvcTest(ActivityRelationResource.class)
class ActivityRelationResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ActivityRelationService activityRelationService;
    @MockBean
    private dev.bachi.crm_demo.activity.ActivityService activityService;
    @MockBean
    private dev.bachi.crm_demo.account.AccountService accountService;
    @MockBean
    private dev.bachi.crm_demo.contact.ContactService contactService;
    @MockBean
    private dev.bachi.crm_demo.opportunity.OpportunityService opportunityService;

    @Test
    void createWithoutAnyLinkReturns400() throws Exception {
        mockMvc.perform(post("/api/activityRelations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("activity")))
                .andExpect(content().string(containsString("account")))
                .andExpect(content().string(containsString("contact")))
                .andExpect(content().string(containsString("opportunity")));
    }

    @Test
    void createWithOneLinkReturns201() throws Exception {
        when(activityRelationService.create(any(ActivityRelationDTO.class))).thenReturn(10001L);

        mockMvc.perform(post("/api/activityRelations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"account\":\"" + UUID.randomUUID() + "\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    void countReturnsNumber() throws Exception {
        when(activityRelationService.count()).thenReturn(2L);

        mockMvc.perform(get("/api/activityRelations/count"))
                .andExpect(status().isOk());
    }

}
