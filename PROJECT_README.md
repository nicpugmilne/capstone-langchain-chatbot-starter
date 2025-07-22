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

## 📚 Knowledge Base Setup (Optional)

To use the knowledge base features, you need to create a Chroma database:

1. **Use the provided notebook**: [Chroma Database Creation](https://colab.research.google.com/drive/1fGCia6TEjerDlysPqUFsBb8x3LwiG0Ef?usp=sharing)

2. **Download pre-built database**: [Pre-built Database](https://github.com/Thinkful-Ed/ai-in-web-dev-resources/raw/refs/heads/main/db.zip)

3. **Place database files** in the `db/` folder

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

## 🏗️ Project Structure

```
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── setup_env.py          # Environment setup script
├── templates/
│   └── index.html        # Main web interface
├── static/
│   ├── style.css         # Modern CSS styling
│   ├── main.js           # Interactive JavaScript
│   └── thinkbot.png      # Logo image
├── tests/
│   └── test.py           # Unit tests
├── db/                   # Knowledge base database (optional)
│   └── README.md         # Database setup instructions
└── screenshots/          # UI screenshots
```

## 🔧 Technical Details

### Backend Technologies

- **Flask**: Web framework
- **LangChain**: AI/LLM orchestration
- **Cohere**: Language model API
- **ChromaDB**: Vector database for knowledge base
- **python-dotenv**: Environment variable management

### Frontend Technologies

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript**: Interactive functionality
- **Bootstrap**: Responsive design framework

### Key Features Implementation

1. **Conversation Memory**: Uses LangChain's `ConversationBufferMemory`
2. **Knowledge Base**: Implements RetrievalQA with ChromaDB
3. **Error Handling**: Comprehensive try-catch blocks
4. **API Design**: RESTful endpoints with JSON responses

## 🚀 Deployment

### Local Development

```bash
python app.py
```

### Production Deployment (Render)

1. Build Command: `pip install -r requirements.txt`
2. Start Command: `gunicorn app:app`
3. Environment Variables:
   - `PYTHON_VERSION`: `3.10.12`
   - `COHERE_API_KEY`: Your API key

## 📝 API Endpoints

- `GET /`: Main chat interface
- `POST /answer`: General chatbot responses
- `POST /kbanswer`: Knowledge base answers
- `POST /search`: Knowledge base search

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the ThinkBot development team assignment.

## 🆘 Troubleshooting

### Common Issues

1. **Import Errors**: Make sure you're in the virtual environment
2. **API Key Issues**: Verify your Cohere API key is correct
3. **Database Errors**: Knowledge base features require a properly set up Chroma database
4. **Port Conflicts**: Change the port in `app.py` if 5000 is in use

### Getting Help

- Check the test results: `python -m pytest tests/test.py -v`
- Verify environment variables: Check your `.env` file
- Review the logs: Look for error messages in the console

---

**Happy Chatting! 🤖✨**
