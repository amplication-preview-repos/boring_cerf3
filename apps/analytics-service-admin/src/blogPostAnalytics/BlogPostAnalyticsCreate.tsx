import * as React from "react";
import { Create, SimpleForm, CreateProps, NumberInput } from "react-admin";

export const BlogPostAnalyticsCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput step={1} label="blogPostId" source="blogPostId" />
        <NumberInput step={1} label="viewCount" source="viewCount" />
      </SimpleForm>
    </Create>
  );
};
