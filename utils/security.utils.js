function sanitize_filename(filename) {
  return filename.replace(/[\/{:}#%&<>$+=-]/g, "_");
}
module.exports = sanitize_filename;
