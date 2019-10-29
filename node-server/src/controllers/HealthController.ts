import { Get, Controller } from "@tsed/common";

@Controller("/health")
export class HealthController {

  @Get("/")
  async getPages() {
    return {status: "ok"};
  }

}