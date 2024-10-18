package com.example.ww.services;

import com.example.ww.Entities.Commande;
import com.example.ww.Entities.StatusCommande;
import com.example.ww.Repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommandeServiceImpl implements CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Override
    public Commande creerCommande(Commande commande) {
        commande.setDateCommande(LocalDateTime.now());
        commande.setStatus(StatusCommande.EN_COURS);
        return commandeRepository.save(commande);
    }

    @Override
    public List<Commande> obtenirToutesLesCommandes() {
        return commandeRepository.findAll();
    }

    @Override
    public Optional<Commande> obtenirCommandeParId(Long id) {
        return commandeRepository.findById(id);
    }

    @Override
    public Commande mettreAJourCommande(Long id, Commande commandeDetails) {
        Optional<Commande> optionalCommande = commandeRepository.findById(id);

        if (optionalCommande.isPresent()) {
            Commande commandeExistante = optionalCommande.get();
            commandeExistante.setStatus(commandeDetails.getStatus());
            commandeExistante.setTotal(commandeDetails.getTotal());
            commandeExistante.setProduits(commandeDetails.getProduits());
            commandeExistante.setQuantites(commandeDetails.getQuantites());
            return commandeRepository.save(commandeExistante);
        } else {
            throw new RuntimeException("Commande non trouvée avec id: " + id);
        }
    }

    @Override
    public void supprimerCommande(Long id) {
        if (commandeRepository.existsById(id)) {
            commandeRepository.deleteById(id);
        } else {
            throw new RuntimeException("Commande non trouvée avec id: " + id);
        }
    }
}
