const tf = require('@tensorflow/tfjs-node-gpu');

const bodyPix = require('@tensorflow-models/body-pix');

const http = require('http');

(async () => {

    const net = await bodyPix.load({

        architecture: 'MobileNetV1',

        outputStride: 16,

        multiplier: 0.75,

        quantBytes: 2,

    });

    const server = http.createServer();

    server.on('request', async (req, res) => {

        var chunks = [];

        req.on('data', (chunk) => {

            chunks.push(chunk);

        });

        req.on('end', async () => {
            //.log("got request")

            const image = tf.node.decodeImage(Buffer.concat(chunks));

            segmentation = await net.segmentPerson(image, {

                flipHorizontal: false,

                internalResolution: 'high',

                segmentationThreshold: 0.7,

            });
            //console.log("get segmentation result")

            res.writeHead(200, { 'Content-Type': 'application/octet-stream' });

            res.write(Buffer.from(segmentation.data));

            res.end();

            tf.dispose(image);

        });

    });

    server.listen(9000);

})();