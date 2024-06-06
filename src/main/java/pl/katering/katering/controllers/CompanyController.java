package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Company;
import pl.katering.katering.services.CompanyService;

import java.util.List;
import java.util.Map;

@RestController
public class CompanyController {
    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/showCompanies")
    public List<Company> CompaniesList() {
        return companyService.showCompanies();
    }

    @GetMapping("/showCompaniesToAccept")
    public List<Company> CompaniesToAcceptList() {
        return companyService.showCompaniesToAccept();
    }

    @PostMapping("/addCompany")
    public ResponseEntity<?> addCompany(@RequestBody Map<String, Object> formData) {
        return companyService.addCompany(formData);
    }

    @PostMapping("/editCompany")
    public ResponseEntity<?> editCompany(@RequestBody Company company, @RequestParam Integer id) {
        return companyService.editCompany(company, id);
    }

    @PostMapping("/deleteCompany")
    public ResponseEntity<?> deleteCompany(@RequestParam Integer id) {
        return companyService.deleteCompany(id);
    }

    @PostMapping("/acceptCompany")
    public ResponseEntity<?> acceptCompany(@RequestParam Integer id) {
        return companyService.acceptCompany(id);
    }
}
