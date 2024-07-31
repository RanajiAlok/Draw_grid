const gridSchema = {
    title: "Grid Options",
    type: "object",
    properties: {
      columns: {
        type: "number",
        title: "Number of Columns"
      },
      rows: {
        type: "number",
        title: "Number of Rows"
      },
      element_draw_direction: {
        type: "string",
        enum: ["row", "col", "cell"],
        title: "Element Draw Direction"
      },
      shade_element: {
        type: "number",
        title: "Shade Elements"
      }
    }
  };