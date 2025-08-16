package dev.bachi.crm_demo.account;

import dev.bachi.crm_demo.activity_relation.ActivityRelation;
import dev.bachi.crm_demo.contact.Contact;
import dev.bachi.crm_demo.opportunity.Opportunity;
import dev.bachi.crm_demo.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@Table(name = "Accounts")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Account {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID accountId;

    @Column(nullable = false)
    private String accountName;

    @Column(length = 100)
    private String industry;

    @Column
    private String website;

    @Column(length = 20)
    private String phone;

    @Column
    private String addressLine1;

    @Column(length = 100)
    private String city;

    @Column(length = 50)
    private String state;

    @Column(length = 20)
    private String postalCode;

    @Column(length = 100)
    private String country;

    @Column
    private OffsetDateTime createdAt;

    @Column
    private OffsetDateTime updatedAt;

    @Column(columnDefinition = "text")
    private String metadata;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "account")
    private Set<Contact> accountContacts = new HashSet<>();

    @OneToMany(mappedBy = "account")
    private Set<Opportunity> accountOpportunities = new HashSet<>();

    @OneToMany(mappedBy = "account")
    private Set<ActivityRelation> accountActivityRelations = new HashSet<>();

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

}
