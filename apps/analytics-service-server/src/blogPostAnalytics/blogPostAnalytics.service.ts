import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BlogPostAnalyticsServiceBase } from "./base/blogPostAnalytics.service.base";

@Injectable()
export class BlogPostAnalyticsService extends BlogPostAnalyticsServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
