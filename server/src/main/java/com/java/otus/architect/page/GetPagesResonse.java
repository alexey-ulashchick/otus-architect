package com.java.otus.architect.page;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
class GetPagesResonse {

  private List<PartialPage> pages;

}