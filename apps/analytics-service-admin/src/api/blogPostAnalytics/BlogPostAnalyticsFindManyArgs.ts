import { BlogPostAnalyticsWhereInput } from "./BlogPostAnalyticsWhereInput";
import { BlogPostAnalyticsOrderByInput } from "./BlogPostAnalyticsOrderByInput";

export type BlogPostAnalyticsFindManyArgs = {
  where?: BlogPostAnalyticsWhereInput;
  orderBy?: Array<BlogPostAnalyticsOrderByInput>;
  skip?: number;
  take?: number;
};
