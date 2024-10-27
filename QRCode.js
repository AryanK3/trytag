const http = require('http');
const QRCode = require('qrcode');
const sharp = require('sharp');
const jsQR = require('jsQR');
const QRCodeReader = require('qrcode-reader');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const server = http.createServer((req, res) => {
    const inputText = 'Brian, CHE123456789, Group';
    QRCode.toDataURL(inputText, (err, url) => {
        if (err) {
            res.writeHead(500, {'Content-type': 'text/plain'});
            res.end('Error generating QR Code');
            return;
        }
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>QR Code</title>
            </head>
            <body>
                <h1>Generated QR Code</h1>
                <img src="${url}" alt="QR Code"/>
            </body>
            </html>
        `);
    });
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

async function decodeQRCode(imagePath) {
    try {
        const image = await sharp(imagePath).raw().ensureAlpha().toBuffer({resolveWithObject: true});
        if (image && image.data && image.info) {
            const { data, info } = image;
            const width = info.width;
            const height = info.height;

            // Convert to Uint8ClampedArray as expected by jsQR
            const imageData = new Uint8ClampedArray(data);

            // Decode the QR code
            const code = jsQR(imageData, width, height);

            if (code) {
                console.log('QR Code Data:', code.data);
            } else {
                console.log('No QR code detected');
            }
        } else {
            console.log('Error: Unable to read image data or retrieve image info.');
        }
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

rl.question('Do you want to decode an image? (yes/no) ', (yn) => {
    if (yn.toLowerCase() === 'yes') {
        const imagePath = 'C:/Users/user/OneDrive/Desktop/temp.png';
        decodeQRCode(imagePath);
    } else {
        console.log('Exiting...');
    }

    // Close the readline interface
    rl.close();
});
