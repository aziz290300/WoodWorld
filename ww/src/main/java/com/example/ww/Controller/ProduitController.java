package com.example.ww.Controller;

import com.example.ww.Entities.Produit;
import com.example.ww.Entities.ImageData;
import com.example.ww.Repository.ProduitRepository;
import com.example.ww.services.IProduitService;
import com.example.ww.services.Impl.StorageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Produit")
public class ProduitController {
    @Autowired
    private final IProduitService dossierMedicalService;
    @Autowired
    private final ProduitRepository dossierMedicalRepository;
    @Autowired
    private final StorageService storageService;

    @DeleteMapping("/delete/{id}")
    public void deleteProduit(@PathVariable("id") Long id) {
        dossierMedicalService.deleteProduit(id);

    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Produit> getProduit(@PathVariable("id") Long id) {
        Produit dossierMedical = dossierMedicalService.getProduit(id);
        return ResponseEntity.ok(dossierMedical);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Produit>> getAllProduit() {
        List<Produit> ProduitList = dossierMedicalService.getAllProduit();
        return ResponseEntity.ok(ProduitList);
    }

    @PutMapping("/updateImgs")
    public ResponseEntity<ImageData> updateImgs(@RequestBody ImageData imageData) {
        ImageData updatedImageData = dossierMedicalService.modifieImage(imageData);
        return ResponseEntity.ok(updatedImageData);
    }
    public List<ImageData> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        List<ImageData> imageDatas = new ArrayList<>();
        for (MultipartFile file: multipartFiles) {
            ImageData imageData = new ImageData(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageDatas.add(imageData);
        }


        return imageDatas;
    }
    @PostMapping(value = "/addproduit", produces = {"text/plain", "application/json"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> addProduit(
            @RequestPart("produit") String produitJson,
            @RequestPart("file") MultipartFile[] file) {
        try {
            // Désérialisation de produitJson
            ObjectMapper objectMapper = new ObjectMapper();
            Produit produit = objectMapper.readValue(produitJson, Produit.class);

            // Gérer les fichiers si présents
            List<ImageData> images = uploadImage(file);
            produit.setImages(images);

            // Sauvegarder le produit
            dossierMedicalService.addProduit(produit);

            return ResponseEntity.ok("Produit ajouté avec succès");
        } catch (Exception e) {
            e.printStackTrace();  // Afficher la trace des erreurs dans les logs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'ajout du produit: " + e.getMessage());
        }
    }



    @PutMapping("/update")
    public ResponseEntity<Produit> updateOrdonnance(@RequestBody Produit produit) {
        Produit updateProduit = dossierMedicalService.updateProduit(produit);
        return ResponseEntity.ok(updateProduit);
    }


}
