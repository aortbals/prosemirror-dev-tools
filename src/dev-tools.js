import React from "react";
import { Subscribe } from "unstated";
import GlobalStateContainer from "./state/global";
import DevToolsCollapsed from "./dev-tools-collapsed";
import DevToolsExpanded from "./dev-tools-expanded";

export default function DevTools(props = {}) {
  return (
    <Subscribe to={[GlobalStateContainer]}>
      {({ state, toggleDevTools }) =>
        state.opened ? (
          <DevToolsExpanded customTabs={props.customTabs} />
        ) : (
          <DevToolsCollapsed onClick={toggleDevTools} />
        )
      }
    </Subscribe>
  );
}
