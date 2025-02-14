# AI Assistant Contributing Guidelines

This document outlines the rules and procedures that AI assistants should follow when helping with this project.

## General Rules

1. **Always Update PROMPT_LOG.md**
   - Add each new user prompt as a new section
   - Include the exact prompt text in quotes
   - Summarize the response and changes made
   - Update the "Current Status" section if applicable

2. **Code Changes**
   - Always explain what you're about to do before making changes
   - Make changes incrementally
   - Verify changes after they're made
   - Update relevant documentation

3. **Documentation**
   - Keep README.md up to date with new features
   - Update configuration documentation when changed
   - Document any new dependencies added

4. **Version Control**
   - Suggest meaningful commit messages
   - Group related changes together
   - Reference relevant prompt log entries in commits

## PROMPT_LOG.md Format

Each new entry should follow this format:

```markdown
## [Brief Title of Change]

**Prompt:**
> [Exact user prompt text]

**Response Summary:**
- [Key change or response 1]
- [Key change or response 2]
- [etc...]

[Update Current Status section if needed]
```

## Example Update

```markdown
## Added Sound Effects

**Prompt:**
> Can we add sound effects when the snake eats the candy?

**Response Summary:**
- Added sound effect system
- Implemented eating sound
- Updated documentation
- Added new asset files

## Current Status
[Update with new features/changes]
```

## Important Procedures

1. **Before Each Response**
   - Check if the change requires a PROMPT_LOG.md update
   - Plan the changes to be made
   - Consider documentation updates needed

2. **After Each Response**
   - Verify all necessary files were updated
   - Ensure PROMPT_LOG.md is current
   - Suggest commits if appropriate

3. **When Adding Features**
   - Update README.md with new features
   - Add configuration documentation if needed
   - Update PROMPT_LOG.md with changes
   - Consider mobile implications

## Commit Messages

When suggesting commits, follow this format:
```
[Brief description of main change]

- Detailed change 1
- Detailed change 2
- etc.

Prompt: [Reference to PROMPT_LOG.md section]
``` 