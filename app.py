import os
from flask import Flask, render_template
from flask import request, jsonify, abort
from dotenv import load_dotenv

from langchain.llms import Cohere
from langchain.chains import RetrievalQA
from langchain.embeddings import CohereEmbeddings
from langchain.vectorstores import Chroma
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

# Load environment variables
load_dotenv()

# Debug: Check if API key is loaded
api_key = os.environ.get("COHERE_API_KEY")
if not api_key:
    print("Warning: COHERE_API_KEY not found in environment variables")
else:
    print(f"API key loaded successfully: {api_key[:10]}...")

app = Flask(__name__)

# Initialize conversation memory
conversation_memory = ConversationBufferMemory()

def load_db():
    """Load the Chroma database for knowledge base functionality"""
    try:
        # Check if API key is available
        if not os.environ.get("COHERE_API_KEY"):
            print("COHERE_API_KEY not available for database loading")
            return None
            
        embeddings = CohereEmbeddings(cohere_api_key=os.environ["COHERE_API_KEY"])
        vectordb = Chroma(persist_directory='db', embedding_function=embeddings)
        
        # Optimize retriever for better performance
        retriever = vectordb.as_retriever(
            search_kwargs={"k": 4}  # Limit to 4 most relevant documents
        )
        
        qa = RetrievalQA.from_chain_type(
            llm=Cohere(
                cohere_api_key=os.environ["COHERE_API_KEY"],
                model="command"  # Use command model (not deprecated)
            ),
            chain_type="stuff",  # Use "stuff" instead of "refine" for faster processing
            retriever=retriever,
            return_source_documents=True
        )
        print("Database loaded successfully")
        return qa
    except Exception as e:
        print(f"Error loading database: {e}")
        return None

# Initialize QA system (will be None if db folder doesn't exist)
qa = load_db()

def answer_from_knowledgebase(message):
    """Answer questions using the knowledge base"""
    if qa is None:
        return "Knowledge base is not available. Please ensure the database is properly set up."
    
    try:
        res = qa({"query": message})
        return res['result']
    except Exception as e:
        return f"Error accessing knowledge base: {str(e)}"

def search_knowledgebase(message):
    """Search the knowledge base and return source documents"""
    if qa is None:
        return "Knowledge base is not available. Please ensure the database is properly set up."
    
    try:
        res = qa({"query": message})
        sources = ""
        for count, source in enumerate(res['source_documents'], 1):
            sources += f"Source {count}\n"
            sources += source.page_content + "\n\n"
        return sources if sources else "No relevant sources found."
    except Exception as e:
        return f"Error searching knowledge base: {str(e)}"

def answer_as_chatbot(message):
    """Answer general questions as a chatbot using LangChain conversation chain with memory"""
    try:
        # Check if API key is available
        if not os.environ.get("COHERE_API_KEY"):
            return "Error: COHERE_API_KEY not configured. Please check your .env file."
            
        # Create a conversation chain with memory
        llm = Cohere(cohere_api_key=os.environ["COHERE_API_KEY"])
        conversation = ConversationChain(
            llm=llm,
            memory=conversation_memory,
            verbose=False
        )
        
        # Get response from conversation chain
        response = conversation.predict(input=message)
        return response
    except Exception as e:
        return f"Error generating response: {str(e)}"

@app.route('/kbanswer', methods=['POST'])
def kbanswer():
    """Handle knowledge base answer requests"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        if not message:
            return jsonify({'message': 'Please provide a message'}), 400
        
        response_message = answer_from_knowledgebase(message)
        return jsonify({'message': response_message}), 200
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@app.route('/search', methods=['POST'])
def search():    
    """Handle knowledge base search requests"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        if not message:
            return jsonify({'message': 'Please provide a message'}), 400
        
        response_message = search_knowledgebase(message)
        return jsonify({'message': response_message}), 200
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@app.route('/answer', methods=['POST'])
def answer():
    """Handle general chatbot answer requests"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        if not message:
            return jsonify({'message': 'Please provide a message'}), 400
        
        response_message = answer_as_chatbot(message)
        return jsonify({'message': response_message}), 200
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@app.route("/")
def index():
    return render_template("index.html", title="ThinkBot - Your AI Assistant")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)