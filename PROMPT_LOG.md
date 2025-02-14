# Snake Game Development Prompt Log

This file maintains a chronological log of the prompts and development steps in creating this Snake game.

## Initial Setup and Framework Selection

**Prompt:**
> Hi! Let's make a game! I want it to be a hybrid game. That I can build and distribute to android, ios and HTML. In the first step I want to for HTML only but keep in mind that later I should be able to port it to ios & android. What is the best framework or tool to build this game?

**Response Summary:**
- Recommended Phaser.js with Capacitor
- Phaser.js for game development
- Capacitor for future mobile deployment
- Explained benefits of this combination

## Development Environment Setup

**Prompt:**
> That is perfect! Can we also use Vite? And what would vite add to this project? If it adds value

**Response Summary:**
- Added Vite for:
  - Fast development server
  - Hot Module Replacement
  - TypeScript support
  - Modern development experience
- Explained Vite's benefits for game development

## Project Structure Setup

**Prompt:**
> Yes, lets start by setting that up. This directory is a git repository so we can just set it up in the current directory

**Response Summary:**
Created basic project structure with:
- Vite configuration
- TypeScript setup
- Basic game scene
- Project dependencies

## Repository Setup

**Prompt:**
> Ok, can we rename the game from "Snake Game" to just "Snake"

**Response Summary:**
Updated all references from "Snake Game" to "Snake" in:
- README.md
- CONTRIBUTING.md
- LICENSE
- package.json
- index.html
- Game scenes

## Game Implementation

**Prompt:**
> Ok, lets build the game itself. The game is a Nokia classic game. You could play it on the Nokia 5110. The game is simple. You have a reqtangle field, there is a snake (simple blocked line) that moves around with the arrow keys. The snake only goes up, down, left & right. The rest of its body follows the same path. There is a candy (simple block) somewhere on the field. If the snake goes over the candy, the lentgh of the snake is increased with one block (added to the back). The eaten candy disapears and a new one pops up somewhere random on the field.

**Response Summary:**
Implemented classic Snake game with:
- Grid-based movement system
- Snake class for managing snake behavior
- Candy spawning system
- Collision detection
- Score tracking
- Game over handling
- Arrow key controls

## Adding AI Guidelines

**Prompt:**
> Don't forget to always update the prompt log. Is there a way to let you know that you always need to do this? Some document with a set of rules or something like that?

**Response Summary:**
- Created CONTRIBUTING_AI.md file with guidelines for AI assistants
- Established rules for maintaining PROMPT_LOG.md
- Added format templates for updates
- Created procedures for documentation updates
- Set commit message guidelines

## Current Status
The game is now playable with all core mechanics implemented, featuring:
- Loading screen
- Menu with top score
- Classic snake gameplay
- Score tracking
- Game over screen
- Comprehensive documentation including AI contribution guidelines

*This log will be updated as development continues.* 