import { MetaFunction } from "@remix-run/node";

import { Text } from "../components/catalyst/text";
import { AppLayout } from "../components/templates/AppLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "Irving Dinh - Just another software engineer" },
    {
      name: "description",
      content: "Just another software engineer",
    },
  ];
};

export default function Page() {
  return (
    <AppLayout>
      <Text>Lorem ipsum dolor sit amet</Text>
    </AppLayout>
  );
}
