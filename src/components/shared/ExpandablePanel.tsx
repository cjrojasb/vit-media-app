import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

interface ExpandablePanelProps {
  header: JSX.Element;
  children: React.ReactNode;
}

function ExpandablePanel({ header, children }: ExpandablePanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <div className=" cursor-pointer" onClick={() => setExpanded(!expanded)}>
          {expanded ? <GoChevronDown /> : <GoChevronUp />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
