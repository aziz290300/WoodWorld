package com.example.ww.services;

import com.example.ww.Entities.Reclamation;
import com.example.ww.Entities.TypeReclamation;

import java.util.List;

public interface IReclamationService {
    Reclamation addReclamation (Reclamation reclamation);
    Reclamation updateReclamation(Reclamation reclamation);
    void deleteReclamation (Integer idreclamation);
    List<Reclamation> getAllReclamation();
    Reclamation getReclamation (Integer idreclamation);

    public List<Reclamation> tri() ;





    public List<Reclamation> getReclamationsByType(TypeReclamation type);

    public List<Reclamation> classerReclamationsParImportance();

    public boolean reclamationEstRepondue(Reclamation reclamation);
    public List<Reclamation> obtenirReclamationsNonReponduesDepuisDeuxJours();
}

