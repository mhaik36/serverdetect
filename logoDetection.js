async function detectLogo(fileName) {
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';

    // Performs logo detection on the local file
    const [result] = await client.logoDetection(fileName);
    const logos = result.logoAnnotations;
    // console.log('Logos:');
    // logos.forEach(logo => console.log(logo));
    return {logos, json: result}
}
module.exports.detectLogo = detectLogo;
// detectLogo('./public/uploads/cmdnNu2.jpg');