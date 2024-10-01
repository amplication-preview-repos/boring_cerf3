import * as graphql from "@nestjs/graphql";
import { BlogPostAnalyticsResolverBase } from "./base/blogPostAnalytics.resolver.base";
import { BlogPostAnalytics } from "./base/BlogPostAnalytics";
import { BlogPostAnalyticsService } from "./blogPostAnalytics.service";

@graphql.Resolver(() => BlogPostAnalytics)
export class BlogPostAnalyticsResolver extends BlogPostAnalyticsResolverBase {
  constructor(protected readonly service: BlogPostAnalyticsService) {
    super(service);
  }
}
