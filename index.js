const crypto = require('crypto');
const readline = require('readline');

function encryptMessage(message, key) {
    const iv = crypto.randomBytes(16); // Generate a random IV (16 bytes)
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
 
    return { iv: iv.toString('hex'), encrypted };
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    rl.question('Enter the message to encrypt: ', (message) => {
        const key = crypto.randomBytes(16);  
        const { iv, encrypted } = encryptMessage(message, key);

        console.log('Encrypted Message:', encrypted);
        console.log('IV:', iv);
        console.log('AES Key (in hex):', key.toString('hex'));

        rl.close();
    });
}

main();
