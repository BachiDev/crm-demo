package dev.bachi.crm_demo.opportunity_product;

import dev.bachi.crm_demo.opportunity.OpportunityService;
import dev.bachi.crm_demo.product.ProductService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/opportunityProducts", produces = MediaType.APPLICATION_JSON_VALUE)
public class OpportunityProductResource {

    private final OpportunityProductService opportunityProductService;
    private final OpportunityService opportunityService;
    private final ProductService productService;

    public OpportunityProductResource(final OpportunityProductService opportunityProductService,
            final OpportunityService opportunityService, final ProductService productService) {
        this.opportunityProductService = opportunityProductService;
        this.opportunityService = opportunityService;
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<OpportunityProductDTO>> getAllOpportunityProducts() {
        return ResponseEntity.ok(opportunityProductService.findAll());
    }

    @GetMapping("/{quantity}")
    public ResponseEntity<OpportunityProductDTO> getOpportunityProduct(
            @PathVariable(name = "quantity") final Integer quantity) {
        return ResponseEntity.ok(opportunityProductService.get(quantity));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createOpportunityProduct(
            @RequestBody @Valid final OpportunityProductDTO opportunityProductDTO) {
        final Integer createdQuantity = opportunityProductService.create(opportunityProductDTO);
        return new ResponseEntity<>(createdQuantity, HttpStatus.CREATED);
    }

    @PutMapping("/{quantity}")
    public ResponseEntity<Integer> updateOpportunityProduct(
            @PathVariable(name = "quantity") final Integer quantity,
            @RequestBody @Valid final OpportunityProductDTO opportunityProductDTO) {
        opportunityProductService.update(quantity, opportunityProductDTO);
        return ResponseEntity.ok(quantity);
    }

    @DeleteMapping("/{quantity}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOpportunityProduct(
            @PathVariable(name = "quantity") final Integer quantity) {
        opportunityProductService.delete(quantity);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/opportunityValues")
    public ResponseEntity<Map<UUID, String>> getOpportunityValues() {
        return ResponseEntity.ok(opportunityService.getOpportunityValues());
    }

    @GetMapping("/productValues")
    public ResponseEntity<Map<UUID, String>> getProductValues() {
        return ResponseEntity.ok(productService.getProductValues());
    }

}
