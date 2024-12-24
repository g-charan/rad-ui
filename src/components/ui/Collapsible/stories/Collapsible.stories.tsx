import { Meta } from "@storybook/react";
import React, { useState } from "react";
import SandboxEditor from "~/components/tools/SandboxEditor/SandboxEditor";
import Collapsible from "~/components/ui/Collapsible/Collapsible";
import Button from "../../Button/Button";
import CollapsibleContent from "../fragments/CollapsibleContent";
import CollapsibleHeader from "../fragments/CollapsibleHeader";
import CollapsibleItem from "../fragments/CollapsibleItem";
import CollapsibleRoot from "../fragments/CollapsibleRoot";
import CollapsibleTrigger from "../fragments/CollapsibleTrigger";

const Items = [
  {
    content:
      "“One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.“ – Plato",
  },
  {
    content:
      "“The superior man understands what is right; the inferior man understands what will sell.” – Confucius",
  },
  {
    content: "“There are no secrets on the internet.” – Paul Babicki",
  },
];

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
  title: "WIP/Collapsible",
};

export default meta;

export const Default = () => {
  return (
    <section>
      <SandboxEditor className="">
        <Collapsible items={Items} disabled></Collapsible>
      </SandboxEditor>
    </section>
  );
};

export const WithTitle = () => {
  return (
    <section>
      <SandboxEditor className="">
        <Collapsible title="Hello World" items={Items} disabled></Collapsible>
      </SandboxEditor>
    </section>
  );
};

export const ExternalTrigger = () => {
  const [open, setOpen] = useState(true);

  const toggleHidden = () => setOpen((p) => !p);

  return (
    <section>
      <SandboxEditor className="">
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          title="Quote"
          items={Items}
          defaultPos={0}
          trigger={
            <Button  style={{ margin: "0" }}>
              {open ? "CLOSE" : "OPEN"}
            </Button>
          }
        />
      </SandboxEditor>
    </section>
  );
};


export const CustomTrigger = () => {
  const [open, setOpen] = useState(true);

  return (
    <section>
      <SandboxEditor className="">
        <CollapsibleRoot open={open} onOpenChange={setOpen}>
          <CollapsibleHeader title="Composable">
            <CollapsibleTrigger>
              <Button style={{ margin: "0" }}>{open ? "CLOSE" : "OPEN"}</Button>
            </CollapsibleTrigger>
          </CollapsibleHeader>
          <CollapsibleItem>{Items[0].content}</CollapsibleItem>
          <CollapsibleContent>{Items.map((item) => item != Items[0] && <CollapsibleItem>{item.content}</CollapsibleItem>)}</CollapsibleContent>
        </CollapsibleRoot>
      </SandboxEditor>
    </section>
  );
}