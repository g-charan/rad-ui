import React, {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import CollapsibleContent from "./fragments/CollapsibleContent";
import CollapsibleHeader from "./fragments/CollapsibleHeader";
import CollapsibleItem from "./fragments/CollapsibleItem";
import CollapsibleRoot from "./fragments/CollapsibleRoot";
import CollapsibleTrigger from "./fragments/CollapsibleTrigger";

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
  defaultOpen?: { content: string | ReactNode };
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
  const defaultOpen = props.defaultOpen;

  // Onclick Handler

  return (
    <CollapsibleRoot
      open={props.open ?? open}
      onOpenChange={props.onOpenChange ?? onOpenChange}
      disabled={disabled}
    >
      <CollapsibleHeader title={title}>
        {/* Button */}
        
          <CollapsibleTrigger asChild>
            {props.trigger && props.trigger}
          </CollapsibleTrigger>
       
      </CollapsibleHeader>

      {/* Conditonal Loop */}
      {disabled ? (
        // loops through all the items with no conditions
        items.map((item, index) => (
          <CollapsibleItem key={index}>{item.content}</CollapsibleItem>
        ))
      ) : (
        <>
          {/* Default value to be shown */}
          {defaultOpen && (
            <CollapsibleItem>{defaultOpen.content}</CollapsibleItem>
          )}
          {/* Collapsable Content  */}
          <CollapsibleContent state={props.open ?? open}>
            {items.map((item, index) => (
              item !== defaultOpen && (
                <CollapsibleItem key={index}>{item.content}</CollapsibleItem>
              )
            ))}
          </CollapsibleContent>
        </>
      )}
    </CollapsibleRoot>
  );
};

export default Collapsible;
