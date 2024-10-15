package com.example.ww.services.Impl;

import com.example.ww.Entities.ImageData;
import com.example.ww.Entities.Produit;
import com.example.ww.Repository.ProduitRepository;
import com.example.ww.Repository.StorageRepository;
import com.example.ww.services.IProduitService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class ProduitServiceImpl implements IProduitService {
    @Autowired
    StorageRepository storageRepository;
    @Autowired
    ProduitRepository produitRepository;
    @Override
    public Produit updateProduit(Produit produit) {
        Optional<Produit> existingProduitOptional = produitRepository.findById(produit.getId());

        if (existingProduitOptional.isPresent()) {
            Produit existingProduit = existingProduitOptional.get();

            // Update fields
            existingProduit.setCategory(produit.getCategory());
            existingProduit.setName(produit.getName());
            existingProduit.setHome(produit.getHome());
            existingProduit.setImages(produit.getImages());

            existingProduit.setSize(produit.getSize());
            existingProduit.setPrice(produit.getPrice());
            existingProduit.setStock(produit.getStock());
            existingProduit.setTypesproduit(produit.getTypesproduit());
            existingProduit.setSouscategory(produit.getSouscategory());
            existingProduit.setWoodtypes(produit.getWoodtypes());


            // Save updated entity
            return produitRepository.save(existingProduit);
        } else {
            throw new EntityNotFoundException("DossierMedical not found");
        }
    }

    @Override
    public Produit addProduit(Produit produit) {
        log.info("ImageURL avant sauvegarde: " + produit.getImageURL());
        return produitRepository.save(produit);

    }

    @Override
    public void deleteProduit(long id) {
        produitRepository.deleteById(id);

    }

    @Override
    public ImageData modifieImage(ImageData o) {
         return storageRepository.save(o);
    }

    @Override
    public List<Produit> getAllProduit() {
        return produitRepository.findAll();
    }

    @Override
    public Produit getProduit(Long id) {
        return produitRepository.findById(id).orElse(null);
    }
}
