package com.example.ww.services;

import com.example.ww.Entities.Commande;

import java.util.List;
import java.util.Optional;

public interface CommandeService {

    // Créer une nouvelle commande
    Commande creerCommande(Commande commande);

    // Récupérer toutes les commandes
    List<Commande> obtenirToutesLesCommandes();

    // Récupérer une commande par son id
    Optional<Commande> obtenirCommandeParId(Long id);

    // Mettre à jour une commande
    Commande mettreAJourCommande(Long id, Commande commande);

    // Supprimer une commande
    void supprimerCommande(Long id);
}
