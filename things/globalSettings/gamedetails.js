import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const gameDetailsSchema = new Schema({
    gameName: {type: String, default: 'Game Name'},
    gameSubtitle: {type: String, default: ''},
    gameAuthorDisplayName: {type: String, default: 'Author Name'},
    gameIcon: String,
    gameDifficulty: {type: [String], enum: ['Beginner', 'Easy', 'Normal', 'Hard', 'Insane', 'Maddening'], default: ['Easy', 'Normal', 'Hard']},
    gameDescription: String,
    gameMode: {enum: ['Casual', 'Classic', 'Casual (Lose Items)', 'Casual (Stat Penalty)'], type: [String], default: ['Casual', 'Classic']},
})

export default gameDetailsSchema