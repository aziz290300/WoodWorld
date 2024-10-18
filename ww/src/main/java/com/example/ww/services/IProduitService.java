package com.example.ww.services;

import com.example.ww.Entities.ImageData;
import com.example.ww.Entities.Produit;

import java.util.List;

public interface IProduitService {
    Produit updateProduit(Produit produit);
    Produit addProduit( Produit produit);

    void deleteProduit(long id);
    public ImageData modifieImage(ImageData o);
    List<Produit> getAllProduit();
    Produit getProduit (Long id);


}
