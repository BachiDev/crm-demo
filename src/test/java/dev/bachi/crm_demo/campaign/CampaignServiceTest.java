package dev.bachi.crm_demo.campaign;

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
class CampaignServiceTest {

    @Mock
    private CampaignRepository campaignRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CampaignService campaignService;

    private Campaign campaign(final UUID id, final String name) {
        final Campaign campaign = new Campaign();
        campaign.setCampaignId(id);
        campaign.setCampaignName(name);
        return campaign;
    }

    @Test
    void findAllMapsDtos() {
        when(campaignRepository.findAll(Sort.by("campaignId")))
                .thenReturn(List.of(campaign(UUID.randomUUID(), "Q3 Leads")));

        assertThat(campaignService.findAll()).extracting(CampaignDTO::getCampaignName)
                .containsExactly("Q3 Leads");
    }

    @Test
    void findAllPagedSearchesOnQuery() {
        final Page<Campaign> page = new PageImpl<>(List.of(campaign(UUID.randomUUID(), "Q3 Leads")));
        when(campaignRepository.findByCampaignNameContainingIgnoreCaseOrCampaignTypeContainingIgnoreCaseOrStatusContainingIgnoreCase(
                "q3", "q3", "q3", PageRequest.of(0, 10))).thenReturn(page);

        assertThat(campaignService.findAllPaged(PageRequest.of(0, 10), "q3").getTotalElements()).isEqualTo(1);
    }

    @Test
    void getMissingThrowsNotFound() {
        final UUID id = UUID.randomUUID();
        when(campaignRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> campaignService.get(id)).isInstanceOf(NotFoundException.class);
    }

    @Test
    void createPersistsAndReturnsId() {
        final UUID id = UUID.randomUUID();
        final CampaignDTO dto = new CampaignDTO();
        dto.setCampaignName("Q3 Leads");
        when(campaignRepository.save(any(Campaign.class))).thenAnswer(invocation -> {
            final Campaign saved = invocation.getArgument(0);
            saved.setCampaignId(id);
            return saved;
        });

        assertThat(campaignService.create(dto)).isEqualTo(id);
    }

    @Test
    void deleteRemovesById() {
        final UUID id = UUID.randomUUID();

        campaignService.delete(id);

        verify(campaignRepository).deleteById(id);
    }

    @Test
    void countDelegatesToRepository() {
        when(campaignRepository.count()).thenReturn(1L);

        assertThat(campaignService.count()).isEqualTo(1L);
    }

}
