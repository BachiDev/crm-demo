package dev.bachi.crm_demo;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String status() {
        return "<h1>CRM Demo API is running!</h1><br/>" +
                "<a href=\"/swagger-ui.html\">See Swagger API documentation here</a>";
    }
}
