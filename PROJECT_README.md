# 🤖 ThinkBot - AI Chatbot with Knowledge Base

A modern, intelligent chatbot built with Flask, LangChain, and Cohere that can answer general questions and provide knowledge base search capabilities.

## ✨ Features

- **🤖 General Chatbot**: Answer any question using Cohere's language model
- **📚 Knowledge Base Search**: Search through your custom document database
- **🎯 Knowledge Base Q&A**: Get specific answers from your knowledge base
- **💬 Conversation Memory**: Maintains context across conversations
- **🎨 Modern UI**: Beautiful, responsive interface with animations
- **⚡ Real-time**: Fast responses with loading indicators
- **🔧 Error Handling**: Graceful error handling and user feedback

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd capstone-langchain-chatbot-starter

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# manually create .env file
echo "COHERE_API_KEY=your_api_key_here" > .env
```

**Get your Cohere API key**: Visit [https://cohere.ai/](https://cohere.ai/) to sign up and get a free API key.

### 3. Run the Application

```bash
python app.py
```

Open your browser and go to `http://localhost:5000`

## 🎯 Usage

### Chatbot Functions

1. **Answer as Chatbot**: General questions and conversations
2. **Answer from Knowledge Base**: Get specific answers from your documents
3. **Search Knowledge Base**: Find relevant source documents

### User Interface Features

- **Auto-scroll**: Chat automatically scrolls to show new messages
- **Clear Chat**: Reset conversation history
- **Loading Indicators**: Visual feedback during processing
- **Error Handling**: Clear error messages for troubleshooting
- **Responsive Design**: Works on desktop and mobile

## 🧪 Testing

Run the test suite to verify functionality:

```bash
python -m pytest tests/test.py -v
```
