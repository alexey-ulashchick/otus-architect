package com.java.otus.architect.page;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Page {

  private String email;
  private String firstName;
  private String lastName;
  private String city;
  private Gender gender;
  private int age;
  private List<String> areasOfInterest;

}