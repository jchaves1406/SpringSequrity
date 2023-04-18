package login.com.login.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/demo-controller")
public class TestController {

    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Bienvenido a la aplicación");
    }

    @GetMapping("/p")
    @RolesAllowed({"USER"})
    public ResponseEntity<String> sayHelloWorld() {
        return ResponseEntity.ok("Bienvenido a la desde rol de usuario");
    }

}
