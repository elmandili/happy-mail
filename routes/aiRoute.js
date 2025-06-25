import express from 'express'
import { generateEmail, generateStory } from '../controller/aiController.js';

const aiRoute = express.Router();
aiRoute.post('/generate-email', generateEmail);

export default aiRoute