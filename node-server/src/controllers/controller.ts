import {Controller, Get, QueryParams} from "@tsed/common";
import { DataSource } from "../services/DataSourse";

const dataSource: DataSource = DataSource.getInstance();

@Controller("/pages")
export class PagesController {

  @Get("/")
  async getPages(@QueryParams("query") query: string) {
    return await dataSource.getPages(query);
  }

}