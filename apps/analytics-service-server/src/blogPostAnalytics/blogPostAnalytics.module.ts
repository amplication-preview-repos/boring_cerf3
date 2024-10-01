import { Module } from "@nestjs/common";
import { BlogPostAnalyticsModuleBase } from "./base/blogPostAnalytics.module.base";
import { BlogPostAnalyticsService } from "./blogPostAnalytics.service";
import { BlogPostAnalyticsController } from "./blogPostAnalytics.controller";
import { BlogPostAnalyticsResolver } from "./blogPostAnalytics.resolver";

@Module({
  imports: [BlogPostAnalyticsModuleBase],
  controllers: [BlogPostAnalyticsController],
  providers: [BlogPostAnalyticsService, BlogPostAnalyticsResolver],
  exports: [BlogPostAnalyticsService],
})
export class BlogPostAnalyticsModule {}
