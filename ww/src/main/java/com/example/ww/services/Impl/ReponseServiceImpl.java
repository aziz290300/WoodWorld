package com.example.ww.services.Impl;

import com.example.ww.Entities.Reclamation;
import com.example.ww.Entities.Reponse;
import com.example.ww.Repository.ReclamationRepository;
import com.example.ww.Repository.ReponseRepository;
import com.example.ww.services.IReponseService;
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
public class ReponseServiceImpl implements IReponseService {
    @Autowired
    ReponseRepository reponseRecRepository;
    @Autowired
    ReclamationRepository reclamationRepository;
    @Override
    public Reponse addReponse(Reponse reponse) {
        return reponseRecRepository.save(reponse);
    }


    @Override
    public Reponse updateReponse(Reponse reponse) {
        Optional<Reponse> existingReponseOptional = reponseRecRepository.findById(reponse.getIdrponse());

        if (existingReponseOptional.isPresent()) {
            Reponse existingReponse = existingReponseOptional.get();
            existingReponse.setDatereponse(reponse.getDatereponse());
            existingReponse.setReponsecontent(reponse.getReponsecontent());

            return  reponseRecRepository.save(existingReponse);
        } else {
            throw new EntityNotFoundException("Expense not found");
        }
    }

    @Override
    public void deleteReponse(Integer idreponse) {
        reponseRecRepository.deleteById(idreponse);

    }

    @Override
    public List<Reponse> getAllReponse() {
        return reponseRecRepository.findAll();
    }

    @Override
    public Reponse getReponse(Integer idreponse) {
        return reponseRecRepository.findById(idreponse).orElse(null);
    }

    @Override
    public Reponse addReponseAndAffect(Integer idreclamartion, Reponse reponse) {
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(idreclamartion);
        if (reclamationOptional.isPresent() ) {
            Reclamation reclamation = reclamationOptional.get();
            reponse.setReclamation(reclamation);
            return reponseRecRepository.save(reponse);
        }else {
            throw new EntityNotFoundException("reclmation not found");
        }

    }


}

