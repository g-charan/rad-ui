import React, {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import CollapsibleComponent from ".";

/*
 * CHECKLIST
 *
 * Add rtl and ltr support
 * Support animations
 * Support basic poitioning of button
 * Add title to collapsible
 *
 * */

export type CollapsibleProps = {
  open?: boolean;
  title?: string;
  trigger?: ReactNode;
  items: { content: string | ReactNode }[];
  disabled?: boolean;
  defaultPos?: number;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
} & PropsWithChildren;

const Collapsible = ({ children, items, ...props }: CollapsibleProps) => {
  //State values if not provided by the user
  const [open, onOpenChange] = useState(props.open ?? false);

  
  // Disable or enable collapse
  const disabled = props.disabled ?? false;

  // Title for the component
  const title = props.title;

  // Default Value to show
  const defaultPos = props.defaultPos;



  // Onclick Handler

  return (
    <CollapsibleComponent.Root
      open={props.open ?? open}
      onOpenChange={props.onOpenChange ?? onOpenChange}
      disabled={disabled}
    >
      <CollapsibleComponent.Header title={title}>
        {/* Button */}
        
          <CollapsibleComponent.Trigger asChild>
            {props.trigger && props.trigger}
          </CollapsibleComponent.Trigger>
       
      </CollapsibleComponent.Header>

      {/* Conditonal Loop */}
      {disabled ? (
        // loops through all the items with no conditions
        items.map((item, index) => (
          <CollapsibleComponent.Item key={index}>{item.content}</CollapsibleComponent.Item>
        ))
      ) : (
        <>
          {/* Default value to be shown */}
          {defaultPos!=undefined ? items[defaultPos] && (
            <CollapsibleComponent.Item>{items[defaultPos].content}</CollapsibleComponent.Item>
          ) : null}
          {/* Collapsable Content  */}
          <CollapsibleComponent.Content>
            {items.map((item, index) => (
              defaultPos!=undefined? item !== items[defaultPos] && (
                <CollapsibleComponent.Item key={index}>{item.content}</CollapsibleComponent.Item>
              ) : <CollapsibleComponent.Item key={index}>{item.content}</CollapsibleComponent.Item>
            ))}
          </CollapsibleComponent.Content>
        </>
      )}
    </CollapsibleComponent.Root>
  );
};



Collapsible.Root = CollapsibleComponent.Root;
Collapsible.Header = CollapsibleComponent.Header;
Collapsible.Trigger = CollapsibleComponent.Trigger;
Collapsible.Content = CollapsibleComponent.Content;
Collapsible.Item = CollapsibleComponent.Item;

export default Collapsible;
