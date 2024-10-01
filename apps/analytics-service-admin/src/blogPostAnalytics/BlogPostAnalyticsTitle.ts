import { BlogPostAnalytics as TBlogPostAnalytics } from "../api/blogPostAnalytics/BlogPostAnalytics";

export const BLOGPOSTANALYTICS_TITLE_FIELD = "id";

export const BlogPostAnalyticsTitle = (record: TBlogPostAnalytics): string => {
  return record.id?.toString() || String(record.id);
};
