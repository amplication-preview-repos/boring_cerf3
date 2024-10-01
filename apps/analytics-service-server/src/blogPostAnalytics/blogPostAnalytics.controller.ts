import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { BlogPostAnalyticsService } from "./blogPostAnalytics.service";
import { BlogPostAnalyticsControllerBase } from "./base/blogPostAnalytics.controller.base";

@swagger.ApiTags("blogPostAnalytics")
@common.Controller("blogPostAnalytics")
export class BlogPostAnalyticsController extends BlogPostAnalyticsControllerBase {
  constructor(protected readonly service: BlogPostAnalyticsService) {
    super(service);
  }
}
