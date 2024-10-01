import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type BlogPostAnalyticsWhereInput = {
  blogPostId?: IntNullableFilter;
  id?: StringFilter;
  viewCount?: IntNullableFilter;
};
