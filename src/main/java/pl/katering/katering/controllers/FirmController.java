package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Firm;
import pl.katering.katering.services.FirmService;

import java.util.List;
import java.util.Map;

@RestController
public class FirmController {
    private final FirmService firmService;

    @Autowired
    public FirmController(FirmService firmService) {
        this.firmService = firmService;
    }

    @GetMapping("/showFirms")
    public List<Firm> firmsList() {
        return firmService.showFirms();
    }

    @PostMapping("/addFirm")
    public ResponseEntity<?> addFirm(@RequestBody Map<String, Object> formData) {
        return firmService.addFirm(formData);
    }

    @PostMapping("/acceptFirm")
    public ResponseEntity<?> acceptFirm(@RequestParam Integer id) {
        return firmService.acceptFirm(id);
    }
}
