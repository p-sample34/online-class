const PDFDocument = require("pdfkit");
const fs = require("fs");

module.exports = function generatePDF(answers) {
  return new Promise((resolve) => {
    const path = "./report.pdf";
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(path));
    doc.fontSize(20).text("Test Report", { align: "center" });
    doc.moveDown();
    answers.forEach((a) => {
      doc.fontSize(12).text(`Student: ${a.studentName}`);
      doc.text(`Question ID: ${a.questionId}`);
      doc.text(`Answer: ${a.answer}`);
      doc.text(`Marks: ${a.marks || 0}`);
      doc.moveDown();
    });
    doc.end();
    resolve(path);
  });
};
