function removeEmojis(text) {
  return text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|[\u2190-\u21FF])/g,
    ""
  );
}


module.exports = removeEmojis;