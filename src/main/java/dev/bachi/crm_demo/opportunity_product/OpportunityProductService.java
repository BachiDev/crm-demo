package dev.bachi.crm_demo.opportunity_product;

import dev.bachi.crm_demo.opportunity.Opportunity;
import dev.bachi.crm_demo.opportunity.OpportunityRepository;
import dev.bachi.crm_demo.product.Product;
import dev.bachi.crm_demo.product.ProductRepository;
import dev.bachi.crm_demo.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class OpportunityProductService {

    private final OpportunityProductRepository opportunityProductRepository;
    private final OpportunityRepository opportunityRepository;
    private final ProductRepository productRepository;

    public OpportunityProductService(
            final OpportunityProductRepository opportunityProductRepository,
            final OpportunityRepository opportunityRepository,
            final ProductRepository productRepository) {
        this.opportunityProductRepository = opportunityProductRepository;
        this.opportunityRepository = opportunityRepository;
        this.productRepository = productRepository;
    }

    public List<OpportunityProductDTO> findAll() {
        final List<OpportunityProduct> opportunityProducts = opportunityProductRepository.findAll(Sort.by("quantity"));
        return opportunityProducts.stream()
                .map(opportunityProduct -> mapToDTO(opportunityProduct, new OpportunityProductDTO()))
                .toList();
    }

    public OpportunityProductDTO get(final Integer quantity) {
        return opportunityProductRepository.findById(quantity)
                .map(opportunityProduct -> mapToDTO(opportunityProduct, new OpportunityProductDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final OpportunityProductDTO opportunityProductDTO) {
        final OpportunityProduct opportunityProduct = new OpportunityProduct();
        mapToEntity(opportunityProductDTO, opportunityProduct);
        return opportunityProductRepository.save(opportunityProduct).getQuantity();
    }

    public void update(final Integer quantity, final OpportunityProductDTO opportunityProductDTO) {
        final OpportunityProduct opportunityProduct = opportunityProductRepository.findById(quantity)
                .orElseThrow(NotFoundException::new);
        mapToEntity(opportunityProductDTO, opportunityProduct);
        opportunityProductRepository.save(opportunityProduct);
    }

    public void delete(final Integer quantity) {
        opportunityProductRepository.deleteById(quantity);
    }

    private OpportunityProductDTO mapToDTO(final OpportunityProduct opportunityProduct,
            final OpportunityProductDTO opportunityProductDTO) {
        opportunityProductDTO.setQuantity(opportunityProduct.getQuantity());
        opportunityProductDTO.setPrice(opportunityProduct.getPrice());
        opportunityProductDTO.setOpportunity(opportunityProduct.getOpportunity() == null ? null : opportunityProduct.getOpportunity().getOpportunityId());
        opportunityProductDTO.setProduct(opportunityProduct.getProduct() == null ? null : opportunityProduct.getProduct().getProductId());
        return opportunityProductDTO;
    }

    private OpportunityProduct mapToEntity(final OpportunityProductDTO opportunityProductDTO,
            final OpportunityProduct opportunityProduct) {
        opportunityProduct.setPrice(opportunityProductDTO.getPrice());
        final Opportunity opportunity = opportunityProductDTO.getOpportunity() == null ? null : opportunityRepository.findById(opportunityProductDTO.getOpportunity())
                .orElseThrow(() -> new NotFoundException("opportunity not found"));
        opportunityProduct.setOpportunity(opportunity);
        final Product product = opportunityProductDTO.getProduct() == null ? null : productRepository.findById(opportunityProductDTO.getProduct())
                .orElseThrow(() -> new NotFoundException("product not found"));
        opportunityProduct.setProduct(product);
        return opportunityProduct;
    }

}
