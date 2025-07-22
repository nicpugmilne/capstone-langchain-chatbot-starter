# Database Setup

This folder should contain your Chroma database files for the knowledge base functionality.

## Setup Instructions

1. Use the provided [notebook](https://colab.research.google.com/drive/1fGCia6TEjerDlysPqUFsBb8x3LwiG0Ef?usp=sharing) to create your Chroma database
2. Download the generated database files and place them in this folder
3. Ensure your `COHERE_API_KEY` is set in the `.env` file

## Alternative

If you encounter issues creating your own database, you can use the pre-built database from:
https://github.com/Thinkful-Ed/ai-in-web-dev-resources/raw/refs/heads/main/db.zip

## File Size Limit

Remember that GitHub has a 25MB file size limit. If your database exceeds this, consider:

1. Committing locally (50MB limit)
2. Reducing the number of documents in your knowledge base

The app will gracefully handle missing database files and inform users when the knowledge base is not available.
