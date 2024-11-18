package com.example.ww.Controller;

import com.example.ww.Entities.Reclamation;
import com.example.ww.Entities.TypeReclamation;
import com.example.ww.Repository.ReclamationRepository;
import com.example.ww.services.IReclamationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Reclamation")

public class ReclamationController {
    @Autowired
    IReclamationService iReclamationService;
    @Autowired
    private ReclamationRepository reclamationRepository;

    @PostMapping("/add")
    public Reclamation addReclamation(@RequestBody Reclamation reclamation) {
        return iReclamationService.addReclamation(reclamation);
    }


    @PutMapping("/update")
    public ResponseEntity<Reclamation> updateReclamation(@RequestBody Reclamation reclamation) {
        Reclamation updatedReclamation = iReclamationService.updateReclamation(reclamation);
        return ResponseEntity.ok(updatedReclamation);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteReclamation(@PathVariable ("id")Integer idreclamation) {
        iReclamationService.deleteReclamation(idreclamation);
    }
    @GetMapping("/getAll")
    public List<Reclamation> getAllReclamation(){
        return iReclamationService.getAllReclamation();
    }
    @GetMapping("/get/{id}")
    public Reclamation getReclamation(@PathVariable ("id") Integer idreclamation) {
        return iReclamationService.getReclamation(idreclamation);
    }
    @GetMapping("/tri")
    List<Reclamation> tri() {
        return iReclamationService.tri();
    }
    @GetMapping("/reclamations/sorted")
    public ResponseEntity<List<Reclamation>> getAllReclamationsSortedByImportance() {
        List<Reclamation> reclamations = iReclamationService.classerReclamationsParImportance();
        return new ResponseEntity<>(reclamations, HttpStatus.OK);
    }
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Reclamation>> getReclamationsByType(@PathVariable TypeReclamation type) {
        List<Reclamation> reclamations = iReclamationService.getReclamationsByType(type);
        if (reclamations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reclamations, HttpStatus.OK);
    }

    @GetMapping("/verifierNonRepondues")
    public ResponseEntity<Map<String, Object>> verifierReclamationsNonReponduesDepuisDeuxJours() {
        try {
            List<Reclamation> reclamationsNonRepondues = iReclamationService.obtenirReclamationsNonReponduesDepuisDeuxJours();
            int nombreTotalReclamationsNonRepondues = reclamationsNonRepondues.size();

            Map<String, Object> response = new HashMap<>();
            response.put("reclamationsNonRepondues", reclamationsNonRepondues);
            response.put("totalReclamationsNonRepondues", nombreTotalReclamationsNonRepondues);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

