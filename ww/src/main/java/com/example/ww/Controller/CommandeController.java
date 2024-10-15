package com.example.ww.Controller;

import com.example.ww.Entities.Commande;
import com.example.ww.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/commandes")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    // Créer une nouvelle commande
    @PostMapping
    public ResponseEntity<Commande> creerCommande(@RequestBody Commande commande) {
        Commande nouvelleCommande = commandeService.creerCommande(commande);
        return ResponseEntity.ok(nouvelleCommande);
    }

    // Récupérer toutes les commandes
    @GetMapping
    public List<Commande> obtenirToutesLesCommandes() {
        return commandeService.obtenirToutesLesCommandes();
    }

    // Récupérer une commande par son id
    @GetMapping("/{id}")
    public ResponseEntity<Commande> obtenirCommandeParId(@PathVariable Long id) {
        Optional<Commande> commande = commandeService.obtenirCommandeParId(id);

        if (commande.isPresent()) {
            return ResponseEntity.ok(commande.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Mettre à jour une commande
    @PutMapping("/{id}")
    public ResponseEntity<Commande> mettreAJourCommande(@PathVariable Long id, @RequestBody Commande commandeDetails) {
        try {
            Commande commandeMiseAJour = commandeService.mettreAJourCommande(id, commandeDetails);
            return ResponseEntity.ok(commandeMiseAJour);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer une commande
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerCommande(@PathVariable Long id) {
        try {
            commandeService.supprimerCommande(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
