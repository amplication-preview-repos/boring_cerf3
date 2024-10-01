import * as React from "react";
import { Edit, SimpleForm, EditProps, NumberInput } from "react-admin";

export const BlogPostAnalyticsEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput step={1} label="blogPostId" source="blogPostId" />
        <NumberInput step={1} label="viewCount" source="viewCount" />
      </SimpleForm>
    </Edit>
  );
};
