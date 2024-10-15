package com.example.ww.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateCommande;

    @Enumerated(EnumType.STRING)
    private StatusCommande status;

    private Double total;

    @ManyToOne
    private User utilisateur;

    // Liste des produits associés à la commande
    @ManyToMany
    @JoinTable(name = "commande_produit",
            joinColumns = @JoinColumn(name = "commande_id"),
            inverseJoinColumns = @JoinColumn(name = "produit_id"))
    private List<Produit> produits;

    // Liste des quantités des produits commandés
    @ElementCollection
    @CollectionTable(name = "produit_quantites", joinColumns = @JoinColumn(name = "commande_id"))
    @Column(name = "quantite")
    private List<Integer> quantites;
}
