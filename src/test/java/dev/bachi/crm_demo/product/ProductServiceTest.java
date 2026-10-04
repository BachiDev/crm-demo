package dev.bachi.crm_demo.product;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;


@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product(final UUID id, final String name) {
        final Product product = new Product();
        product.setProductId(id);
        product.setProductName(name);
        product.setSku("SKU-" + name);
        product.setPrice(new BigDecimal("10.00"));
        return product;
    }

    @Test
    void findAllPagedWithoutQueryListsEverything() {
        final Page<Product> page = new PageImpl<>(List.of(product(UUID.randomUUID(), "A"), product(UUID.randomUUID(), "B")));
        when(productRepository.findAll(PageRequest.of(0, 10))).thenReturn(page);

        final Page<ProductDTO> result = productService.findAllPaged(PageRequest.of(0, 10), null);

        assertThat(result.getTotalElements()).isEqualTo(2);
        verify(productRepository).findAll(PageRequest.of(0, 10));
    }

    @Test
    void findAllPagedWithQuerySearches() {
        final Page<Product> page = new PageImpl<>(List.of(product(UUID.randomUUID(), "CRM-Pro")));
        when(productRepository.findByProductNameContainingIgnoreCaseOrSkuContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                "crm", "crm", "crm", PageRequest.of(0, 10))).thenReturn(page);

        final Page<ProductDTO> result = productService.findAllPaged(PageRequest.of(0, 10), "  crm ");

        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent().get(0).getProductName()).isEqualTo("CRM-Pro");
    }

    @Test
    void countDelegatesToRepository() {
        when(productRepository.count()).thenReturn(2L);

        assertThat(productService.count()).isEqualTo(2L);
    }

}
