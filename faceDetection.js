const cropImage = require('./cropImage');
async function detectFaces(inputFile) {
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    // Make a call to the Vision API to detect the faces
    const request = {image: {source: {filename: inputFile}}};
    const results = await client.faceDetection(request);
    const faces = results[0].faceAnnotations;
    const cropFiles = [];
    const numFaces = faces.length;
    for(i=0; i<numFaces; i++){
        const outputFile = Date.now() + 'crop.jpg';
        const x = results[0].faceAnnotations[i].boundingPoly.vertices[0].x;
        const y = results[0].faceAnnotations[i].boundingPoly.vertices[0].y;
        const w = results[0].faceAnnotations[i].boundingPoly.vertices[2].x - results[0].faceAnnotations[i].boundingPoly.vertices[0].x;
        const h = results[0].faceAnnotations[i].boundingPoly.vertices[2].y - results[0].faceAnnotations[i].boundingPoly.vertices[0].y;
        await cropImage.crop(inputFile, './public/images/crop/' + outputFile, w, h, x, y)
            cropFiles[i] = 'https://i2i-appserver.herokuapp.com/images/crop/'+outputFile;
        // console.log('x:'+x);
        // console.log('y:'+y);
        // console.log('w:'+w);
        // console.log('h:'+h);
    }
    // console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'}.`);
    // console.log(`boundingPoly[0]: ${JSON.stringify(results[0].faceAnnotations[0].boundingPoly)} `);
    return  {numFaces, cropFiles, json: results};
}



    // const faceDetection =  detectFaces('./public/uploads/cmdnNu2.jpg');
    // console.log('numFaces:'+faceDetection.numFaces)

module.exports.detectFaces = detectFaces;