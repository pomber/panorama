import React from "react";
import { InputNode, RenderNode, buildTree } from "./tree";

type DiagramProps = {
  data: InputNode;
};

export type { InputNode };

export function Diagram({ data }: DiagramProps) {
  const { tree, height, width } = React.useMemo(() => buildTree(data), [data]);
  return (
    <svg
      style={{
        fontFamily: "monospace",
        fill: "none",
        height,
        width,
      }}
      stroke="black"
    >
      <Tree node={tree} />
    </svg>
  );
}

function Tree({ node }: { node: RenderNode }) {
  return (
    <g>
      <rect x={node.x} y={node.y} width={node.width} height={node.height} />
      <text x={node.x + 10} y={node.y + 20} fill="black">
        {node.name}
      </text>
      {node.children.map((child) => (
        <Tree key={child.id} node={child} />
      ))}
    </g>
  );
}
