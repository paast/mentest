
const jsreport = require('jsreport-core')();
const fs = require('fs');
const path = require('path');

const getPdfTest = async (req, res, next) => {
  const p = path.resolve('static/report-pdfs/test-report.pdf');
  await jsreport.init();
  jsreport.render({
    template: {
      content: "h2 henlo worl, my name carl :B -- test",
      engine: 'pug',
      recipe: 'chrome-pdf'
    }
  }).then(out => {
    const thing = fs.createWriteStream(p);
    out.stream.pipe(thing);
  })cx
  
  // const options = { root: path.resolve('static', 'test.txt') }
  // console.log(options.root);
  
  // await res.sendFile('test.txt', options, err => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('no error');
  //   }
  // });
}

const getPdf = async (req, res, next) => {
  // const filePath = path.resolve('./static/test.txt').replace(/\\/g, '/');
  const filePath = 'C:/_/work/mentest/static/test.txt';
  console.log(filePath)

  res.sendFile('/README.md', err => {
    if (err) {
      console.log(err);
    } else {
      console.log('no error');
    }
  })
};

module.exports = {
  getPdfTest,
  getPdf
}
