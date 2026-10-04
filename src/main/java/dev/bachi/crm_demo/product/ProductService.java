package dev.bachi.crm_demo.product;

import dev.bachi.crm_demo.util.NotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(final ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDTO> findAll() {
        final List<Product> products = productRepository.findAll(Sort.by("productId"));
        return products.stream()
                .map(product -> mapToDTO(product, new ProductDTO()))
                .toList();
    }

    public Page<ProductDTO> findAllPaged(final Pageable pageable, final String query) {
        final String q = query == null ? null : query.strip();
        final Page<Product> page = (q == null || q.isEmpty())
                ? productRepository.findAll(pageable)
                : productRepository.findByProductNameContainingIgnoreCaseOrSkuContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q, q, pageable);
        return page.map(product -> mapToDTO(product, new ProductDTO()));
    }

    public long count() {
        return productRepository.count();
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
        return productDTO;
    }

    private Product mapToEntity(final ProductDTO productDTO, final Product product) {
        product.setProductName(productDTO.getProductName());
        product.setSku(productDTO.getSku());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        return product;
    }

}
