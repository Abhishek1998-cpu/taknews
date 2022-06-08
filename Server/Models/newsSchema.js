const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  niche: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("NEW", newsSchema);
module.exports = News;
