const schema = {
    "title": "Block Grid Parameters",
    "type": "object",
    "properties": {
        "number": {
            "type": "number",
            "title": "Number to display"
        },
        "no_of_1000_blocks": {
            "type": "number",
            "title": "Number of 1000 blocks"
        },
        "no_of_100_blocks": {
            "type": "number",
            "title": "Number of 100 blocks"
        },
        "no_of_10_blocks": {
            "type": "number",
            "title": "Number of 10 blocks"
        },
        "no_of_1_blocks": {
            "type": "number",
            "title": "Number of 1 blocks"
        },
        "1000_blocks_color": {
            "type": "string",
            "title": "Color for 1000 blocks",
            "enum": ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "black"],
            "default": "blue"
        },
        "100_blocks_color": {
            "type": "string",
            "title": "Color for 100 blocks",
            "enum": ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "black"],
            "default": "blue"
        },
        "10_blocks_color": {
            "type": "string",
            "title": "Color for 10 blocks",
            "enum": ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "black"],
            "default": "blue"
        },
        "1_blocks_color": {
            "type": "string",
            "title": "Color for 1 blocks",
            "enum": ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "black"],
            "default": "blue"
        },
        "label_blocks": {
            "type": "boolean",
            "title": "Label blocks",
            "default": false
        }
       
    },
    "required": ["number"]
};
