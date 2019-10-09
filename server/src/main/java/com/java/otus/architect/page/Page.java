package com.java.otus.architect.page;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Page {

  private String email;
  private String firstName;
  private String lastName;
  private String city;
  private Gender gender;
  private int age;
  private String[] areasOfInterest;

}