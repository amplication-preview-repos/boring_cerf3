import { SortOrder } from "../../util/SortOrder";

export type BlogPostAnalyticsOrderByInput = {
  blogPostId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
  viewCount?: SortOrder;
};
