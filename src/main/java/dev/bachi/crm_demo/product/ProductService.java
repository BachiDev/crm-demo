package dev.bachi.crm_demo.product;

import dev.bachi.crm_demo.opportunity_product.OpportunityProduct;
import dev.bachi.crm_demo.opportunity_product.OpportunityProductRepository;
import dev.bachi.crm_demo.util.CustomCollectors;
import dev.bachi.crm_demo.util.NotFoundException;
import dev.bachi.crm_demo.util.ReferencedWarning;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final OpportunityProductRepository opportunityProductRepository;

    public ProductService(final ProductRepository productRepository,
            final OpportunityProductRepository opportunityProductRepository) {
        this.productRepository = productRepository;
        this.opportunityProductRepository = opportunityProductRepository;
    }

    public List<ProductDTO> findAll() {
        final List<Product> products = productRepository.findAll(Sort.by("productId"));
        return products.stream()
                .map(product -> mapToDTO(product, new ProductDTO()))
                .toList();
    }

    public ProductDTO get(final UUID productId) {
        return productRepository.findById(productId)
                .map(product -> mapToDTO(product, new ProductDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final ProductDTO productDTO) {
        final Product product = new Product();
        mapToEntity(productDTO, product);
        return productRepository.save(product).getProductId();
    }

    public void update(final UUID productId, final ProductDTO productDTO) {
        final Product product = productRepository.findById(productId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(productDTO, product);
        productRepository.save(product);
    }

    public void delete(final UUID productId) {
        productRepository.deleteById(productId);
    }

    private ProductDTO mapToDTO(final Product product, final ProductDTO productDTO) {
        productDTO.setProductId(product.getProductId());
        productDTO.setProductName(product.getProductName());
        productDTO.setSku(product.getSku());
        productDTO.setPrice(product.getPrice());
        productDTO.setDescription(product.getDescription());
        productDTO.setCreatedAt(product.getCreatedAt());
        productDTO.setUpdatedAt(product.getUpdatedAt());
        return productDTO;
    }

    private Product mapToEntity(final ProductDTO productDTO, final Product product) {
        product.setProductName(productDTO.getProductName());
        product.setSku(productDTO.getSku());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        product.setCreatedAt(productDTO.getCreatedAt());
        product.setUpdatedAt(productDTO.getUpdatedAt());
        return product;
    }

    public ReferencedWarning getReferencedWarning(final UUID productId) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Product product = productRepository.findById(productId)
                .orElseThrow(NotFoundException::new);
        final OpportunityProduct productOpportunityProduct = opportunityProductRepository.findFirstByProduct(product);
        if (productOpportunityProduct != null) {
            referencedWarning.setKey("product.opportunityProduct.product.referenced");
            referencedWarning.addParam(productOpportunityProduct.getQuantity());
            return referencedWarning;
        }
        return null;
    }

    public Map<UUID, String> getProductValues() {
        return productRepository.findAll(Sort.by("productId"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Product::getProductId, Product::getProductName));
    }

}
