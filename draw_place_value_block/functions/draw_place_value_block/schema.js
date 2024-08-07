const schema = {
    "title": "Block Grid Parameters",
    "type": "object",
    "properties": {
        "columns": {
            "type": "number",
            "title": "Number of columns",
            "minimum": 2,
            "maximum": 3
        },
        "rows": {
            "type": "number",
            "title": "Number of rows",
            "minimum": 1,
            "maximum": 10
        },
        "block_type": {
            "type": "string",
            "enum": ["squares", "cubes"],
            "title": "Type of blocks"
        },
        "block_size": {
            "type": "number",
            "title": "Size of each block (default 10x10 units)",
            "default": 10
        },
        "column_labels": {
            "type": "string",
            "enum": ["ones", "tens", "hundreds", "custom"],
            "title": "Labels for columns"
        },
        "shading": {
            "type": "boolean",
            "title": "Apply shading"
        },
        "label_blocks": {
            "type": "boolean",
            "title": "Label blocks"
        },
        "color_scheme": {
            "type": "string",
            "title": "Color scheme for blocks",
            "default": "default"
        },
        "border_visibility": {
            "type": "boolean",
            "title": "Border visibility"
        },
        "operation": {
            "type": "string",
            "enum": ["addition", "subtraction", "multiplication", "division"],
            "title": "Type of mathematical operation"
        },
        "additional_number": {
            "type": "number",
            "title": "Number to be added/subtracted"
        },
        "operation_position": {
            "type": "string",
            "enum": ["top", "bottom", "left", "right"],
            "title": "Position of the additional number"
        },
        "show_operation_sign": {
            "type": "boolean",
            "title": "Show operation sign"
        },
        "operation_sign": {
            "type": "string",
            "title": "Sign of the operation (e.g., +, -)"
        }
    },
    "required": ["columns", "rows", "block_type", "block_size", "column_labels"]
};
