package com.java.otus.architect.page;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreatePageRequest {

  private String firstName;
  private String lastName;
  private String city;
  private Gender gender;
  private int age;
  private List<String> areasOfInterest;

}