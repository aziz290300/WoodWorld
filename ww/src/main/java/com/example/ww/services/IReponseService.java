package com.example.ww.services;

import com.example.ww.Entities.Reponse;

import java.util.List;

public interface IReponseService {
    Reponse addReponse (Reponse reponse);
    Reponse updateReponse(Reponse reponse);
    void deleteReponse (Integer idreponse);
    List<Reponse> getAllReponse();
    Reponse getReponse (Integer idreponse);
    Reponse addReponseAndAffect(Integer idreclamartion, Reponse reponse);

}

