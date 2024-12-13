// backend/src/generate-token.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = () => {
    
    const userData = {
        id: '123',
        email: 'admin@example.com',
        isAdmin: true
    };

    const token = jwt.sign(
        userData,
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '30d' }
    );

    return token;
};

const token = generateToken();
console.log('\nGenerated JWT Token:');
console.log(token);

const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
console.log('\nDecoded Token Contents:');
console.log(decoded);