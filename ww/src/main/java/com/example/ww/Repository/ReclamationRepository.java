package com.example.ww.Repository;

import com.example.ww.Entities.Reclamation;
import com.example.ww.Entities.TypeReclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Integer> {
    List<Reclamation> findAllByOrderByDatereclamation();
    List<Reclamation> findByTypeReclamation(TypeReclamation type);

}