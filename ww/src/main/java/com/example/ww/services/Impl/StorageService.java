package com.example.ww.services.Impl;

import com.example.ww.Entities.ImageData;
import com.example.ww.Repository.StorageRepository;
import com.example.ww.Utils.ImageUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class StorageService {
    @Autowired
    private StorageRepository repository;

    // Save image data directly to the database
    public ImageData uploadImage2(MultipartFile file) throws IOException {
        ImageData imageData = repository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
        if (imageData != null) {

            return imageData;
        }
        return null;
    }

    public byte[] downloadImage(String fileName){
        Optional<ImageData> dbImageData = repository.findByName(fileName);
        byte[] images=ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }

    public List<ImageData> displayToolOffers(){ return (List<ImageData>) repository.findAll();}
}
