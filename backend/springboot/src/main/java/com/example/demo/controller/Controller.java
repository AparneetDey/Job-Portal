package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

import javax.sql.DataSource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class Controller {

  @Autowired
  private DataSource dataSource;

  @GetMapping("/")
  public String Welcome() {
    return "Hello World";
  }

  @GetMapping("/about")
  public String About() throws SQLException {
    return "About Page" + dataSource.getConnection();
  }

  @PostMapping("/login")
  public String LoginUser(@RequestBody String entity) {
    // TODO: process POST request
    System.out.println(entity);
    return entity;
  }

}