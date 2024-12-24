import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Collapsible from "../Collapsible";

import CollapsibleHeader from "../fragments/CollapsibleHeader";
import CollapsibleItem from "../fragments/CollapsibleItem";
import CollapsibleTrigger from "../fragments/CollapsibleTrigger";

describe("Collapsible Component", () => {
    it("renders without crashing", () => {
        const { getByText } = render(
            <Collapsible items={[{ content: "Item 1" }]} open={true}/>
        );
        expect(getByText("Item 1")).toBeInTheDocument();
    });

    it("renders title when provided", () => {
        const { getByText } = render(
            <Collapsible title="Test Title" items={[{ content: "Item 1" }]} />
        );
        expect(getByText("Test Title")).toBeInTheDocument();
    });

    it("renders trigger when provided", () => {
        const { getByText } = render(
            <Collapsible trigger={<button>Toggle</button>} items={[{ content: "Item 1" }]} />
        );
        expect(getByText("Toggle")).toBeInTheDocument();
    });

    it("toggles content visibility on trigger click", () => {
        const { getByText, queryByText } = render(
            <Collapsible trigger={<button>Toggle</button>} items={[{ content: "Item 1" }]} />
        );
        const trigger = getByText("Toggle");
        fireEvent.click(trigger);
        expect(queryByText("Item 1")).toBeInTheDocument();
        fireEvent.click(trigger);
        expect(queryByText("Item 1")).not.toBeInTheDocument();
    });

    it("disables collapsible when disabled prop is true", () => {
      const { getByText, queryByText } = render(
        <Collapsible
          disabled={true}
          trigger={<button>Toggle</button>}
          items={[{ content: "Item 1" }]}
        />
      );
      const trigger = getByText("Toggle");
      const initialState = queryByText("Item 1");
      fireEvent.click(trigger);
      expect(queryByText("Item 1")).toBe(initialState); // Content state should not change
    });

    it("renders default open content when provided", () => {
        const { getByText } = render(
            <Collapsible defaultPos={0} items={[{ content: "Default Item" }]} />
        );
        expect(getByText("Default Item")).toBeInTheDocument();
    });

    
});




describe("CollapsibleHeader Component", () => {
    it("renders title", () => {
        const { getByText } = render(<CollapsibleHeader title="Header Title" />);
        expect(getByText("Header Title")).toBeInTheDocument();
    });
});

describe("CollapsibleTrigger Component", () => {
    it("renders trigger content", () => {
        const { getByText } = render(
            <CollapsibleTrigger asChild>
                <button>Trigger Button</button>
            </CollapsibleTrigger>
        );
        expect(getByText("Trigger Button")).toBeInTheDocument();
    });
});


describe("CollapsibleItem Component", () => {
    it("renders item content", () => {
        const { getByText } = render(
            <CollapsibleItem>
                <div>Item Content</div>
            </CollapsibleItem>
        );
        expect(getByText("Item Content")).toBeInTheDocument();
    });
});
