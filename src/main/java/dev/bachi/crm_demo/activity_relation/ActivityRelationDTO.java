package dev.bachi.crm_demo.activity_relation;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AtLeastOneLink
public class ActivityRelationDTO {

    private Long id;
    private UUID activity;
    private UUID account;
    private UUID contact;
    private UUID opportunity;

}
