package com.projects.edith.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "Message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer senderid;
    private Integer receiverid;

    @ManyToOne
    @Fetch(value = FetchMode.SELECT)
    @JoinColumn(name = "senderid", referencedColumnName = "id", insertable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User sender;

    @ManyToOne
    @Fetch(value = FetchMode.SELECT)
    @JoinColumn(name = "receiverid", referencedColumnName = "id", insertable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User receiver;

    private String message;
    private Date timestamp;


}
