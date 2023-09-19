import { useEffect, useRef } from "react";
import json from "@/assets/data.js";
const resetTable = (arr) => {
  return (arr || []).map((item) => {
    const fields = item.columns.map((field) => ({
      ...field,
      isField: true,
      background: "transparent",
      key: field.id,
    }));

    return {
      ...item,
      fields,
      isTable: true,
      headColor: "pink",
      key: item.id,
    };
  });
};
export default function Graph() {
  const graphRef = useRef(null);
  const myDiagram = useRef(null);

  const setData = () => {
    const tables = [
      ...resetTable(json.tables),
      ...resetTable(json.views),
      ...resetTable(json.paths),
      ...resetTable(json.databases),
      ...resetTable(json.schemas),
      ...resetTable(json.stages),
      ...resetTable(json.streams),
      ...resetTable(json.variables),
      ...resetTable(json.resultsets),
    ];

    const links = json?.links?.map((item) => ({
      ...item,
      from: item.parentSourceId,
      fromPort: item.sourceId,
      to: item.parentTargetId,
      toPort: item.targetId,
      type: item.type === "fdd" ? [0] : [6, 3],
      diyId: String(Math.random()),
    }));

    myDiagram.current.model.nodeDataArray = tables;

    myDiagram.current.model.linkDataArray = links;
  };
  const init = () => {
    if (!window.go) {
      return;
    }
    const go = window.go;
    const $ = go.GraphObject.make;
    myDiagram.current = $(go.Diagram, graphRef.current, {
      initialContentAlignment: go.Spot.Center,
      padding: new go.Margin(0, 80),
      allowClipboard: false,
      allowDelete: false,
      allowInsert: false,
      allowLink: false,
      allowMove: false,
      allowTextEdit: false,
      allowSelect: false,
      "undoManager.isEnabled": true,
      "commandHandler.deletesTree": true, // 不允许使用delete键删除节点
      layout: $(go.LayeredDigraphLayout, {
        columnSpacing: 30,
        layerSpacing: 230,
      }),
    });
    const fieldTemplate = $(
      go.Panel,
      "TableRow", // this Panel is a row in the containing Table
      new go.Binding("portId", "id"), // this Panel is a "port"
      {
        fromSpot: go.Spot.Right, // links only go from the right side to the left side
        toSpot: go.Spot.Left,
        fromLinkable: false,
        toLinkable: false,
      },

      $(
        go.TextBlock,
        {
          name: "TEXT",
          column: 1,
          font: "10px",
          alignment: go.Spot.Left,
          width: 162,
          margin: new go.Margin(2, 6),
          fromLinkable: false,
          toLinkable: false,
        },
        new go.Binding("text", "name"),
        new go.Binding("isStrikethrough", "existFlag", (v) => !v)
      )
    );

    myDiagram.current.linkTemplate = $(
      go.Link,
      {
        selectable: false,
        curve: go.Link.Bezier,
        // routing: window.go.Link.Orthogonal,
        toEndSegmentLength: 130,
        fromEndSegmentLength: 130,
        layerName: "Background", // 不要在任何节点前面交叉
      },
      $(
        go.Shape,
        {
          name: "LINKSHAPE",
          stroke: "#a1a1a1",
        },
        new go.Binding("strokeDashArray", "type")
      ),
      $(go.Shape, {
        toArrow: "standard",
        stroke: "#a1a1a1",
        fill: "#a1a1a1",
      }),
      $(
        go.Panel,
        "Auto", // this whole Panel is a link label
        new go.Binding("visible", "transforms", (v) => !!v?.length),
        $(go.Shape, "Circle", {
          strokeWidth: 1,
          stroke: "#fff",
          width: 8,
          height: 8,
          fill: "#a1a1a1",
          cursor: "pointer",
        })
      )
    );
    // This template represents a whole "record".
    myDiagram.current.nodeTemplate = $(
      go.Node,
      "Auto",
      { copyable: false, deletable: false },

      $(
        // 边框的颜色
        go.Shape,
        { fill: null },
        new go.Binding("stroke", "headColor")
      ),
      // the content consists of a header and a list of items
      $(
        go.Panel,
        "Vertical",
        // this is the header for the whole node
        $(
          go.Panel,
          "Vertical",
          $(
            go.TextBlock,
            {
              verticalAlignment: go.Spot.Center,
              height: 24,
              overflow: go.TextBlock.OverflowEllipsis,
              width: 178,
              textAlign: "center",
              maxLines: 1,
              stroke: "#fefefe",
            },
            new go.Binding("text", "name"),
            new go.Binding("background", "headColor"),
            new go.Binding("isStrikethrough", "existFlag", (v) => !v),
            {
              // define a tooltip for each node that displays the color as text
              toolTip: $(
                "ToolTip",
                $(
                  go.TextBlock,
                  {
                    margin: 4,
                    alignmentFocus: go.Spot.Top,
                  },
                  new go.Binding("text", "name")
                )
              ), // end of Adornment
            }
          )
        ),
        $(
          go.Panel,
          "Table",
          {
            name: "TABLE",
            padding: 2,
            background: "#fff",
            itemTemplate: fieldTemplate,
          },
          new go.Binding("itemArray", "fields")
        ) // end Table Panel of items
      ) // end Vertical Panel
    ); // end Node
    // 设置网格
    myDiagram.current.grid = $(
      go.Panel,
      "Grid",
      {
        name: "GRID",
        visible: true,
        gridCellSize: new go.Size(20, 20),
        gridOrigin: new go.Point(0, 0),
      },
      $(go.Shape, "LineH", {
        stroke: "#dcdfe6",
        strokeWidth: 0.5,
        interval: 1,
      }),
      $(go.Shape, "LineV", {
        stroke: "#dcdfe6",
        strokeWidth: 0.5,
        interval: 1,
      })
    );
    myDiagram.current.model = new go.GraphLinksModel();
    myDiagram.current.model.linkFromPortIdProperty = "fromPort";
    myDiagram.current.model.linkToPortIdProperty = "toPort";
    setData();
  };
  useEffect(() => {
    init();
    return () => {
      myDiagram.current.div = null;
    };
  }, []);
  return (
    <>
      <div className="graph" ref={graphRef}></div>
    </>
  );
}
