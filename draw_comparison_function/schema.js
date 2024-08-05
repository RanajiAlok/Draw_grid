const schema = {
    title: "Drawing Options",
    type: "object",
    properties: {
      left_image: {
        type: "string",
        enum: ["car", "coin", "star", "circle", "square", "polygon"],
        title: "Left Image Type",
        properties: {
          polygon_sides: {
            type: "integer",
            title: "Number of sides",
            minimum: 3,
          },
        },
      },
      left_image_count: {
        type: "number",
        title: "Number of Cells for Left Image",
        minimum: 1
      },
      left_rows: {
        type: "number",
        title: "Number of Rows for Left Grid",
        minimum: 1
      },
      left_columns: {
        type: "number",
        title: "Number of Columns for Left Grid",
        minimum: 1
      },
      right_image: {
        type: "string",
        enum: ["car", "coin", "star", "circle", "square", "polygon"],
        title: "Right Image Type",
        properties: {
          polygon_sides: {
            type: "integer",
            title: "Number of sides",
            minimum: 3,
          },
        },
      },
      right_image_count: {
        type: "number",
        title: "Number of Cells for Right Image",
        minimum: 1
      },
      right_rows: {
        type: "number",
        title: "Number of Rows for Right Grid",
        minimum: 1
      },
      right_columns: {
        type: "number",
        title: "Number of Columns for Right Grid",
        minimum: 1
      },
    },
    required: ["left_image", "left_image_count", "left_rows", "left_columns", "right_image", "right_image_count", "right_rows", "right_columns"]
  }; 