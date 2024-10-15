package com.example.ww.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private long price;
    @Enumerated(EnumType.STRING)
    private woodtypes woodtypes ;
    @Enumerated(EnumType.STRING)
    private size size ;
    @Enumerated(EnumType.STRING)
    private stock stock ;
    @Enumerated(EnumType.STRING)
    private typesproduit typesproduit ;
    @Enumerated(EnumType.STRING)
    private souscategory  souscategory  ;
    @Enumerated(EnumType.STRING)
    private home home ;
    @Enumerated(EnumType.STRING)
    private category category ;
    private String imageURL;

    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = {CascadeType.ALL}
    )
    @JoinTable(name = "dossierImage",
            joinColumns = {
                    @JoinColumn(name = "dossierId")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "imageId")
            }
    )
    public List<ImageData> images;


}
