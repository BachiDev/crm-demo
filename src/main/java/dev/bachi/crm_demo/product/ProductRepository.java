package dev.bachi.crm_demo.product;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, UUID> {

    Page<Product> findByProductNameContainingIgnoreCaseOrSkuContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String productName, String sku, String description, Pageable pageable);
}
