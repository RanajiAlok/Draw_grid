const schema = {
  title: "Drawing Options",
  type: "object",
  properties: {
      left_image: {
          type: "string",
          enum: ["car", "coin", "star", "circle", "square", "triangle", "quadrilateral", "pentagon", "hexagon", "heptagon", "octagon", "nonagon", "decagon"],
          title: "Left Image Type"
      },
      left_image_count: {
          type: "number",
          title: "Number of Images for Left",
          minimum: 1
      },
      right_image: {
          type: "string",
          enum: ["car", "coin", "star", "circle", "square", "triangle", "quadrilateral", "pentagon", "hexagon", "heptagon", "octagon", "nonagon", "decagon"],
          title: "Right Image Type"
      },
      right_image_count: {
          type: "number",
          title: "Number of Images for Right",
          minimum: 1
      }
  },
  required: ["left_image", "left_image_count", "right_image", "right_image_count"]
};
