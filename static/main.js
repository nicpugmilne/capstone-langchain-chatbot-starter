// Global variables
let isLoading = false;
let progressInterval = null;
let startTime = null;

function sendMessage() {
  if (isLoading) return; // Prevent multiple requests

  let messageInput = document.getElementById("message-input");
  let message = messageInput.value.trim();

  if (!message) {
    showError("Please enter a message");
    return;
  }

  displayMessage("user", message);
  messageInput.value = "";

  // Show loading indicator
  showLoading();

  // Get the selected function from the dropdown menu
  let functionSelect = document.getElementById("function-select");
  let selectedFunction = functionSelect.value;

  // Send an AJAX request to the Flask API endpoint based on the selected function
  let xhr = new XMLHttpRequest();
  let url;

  switch (selectedFunction) {
    case "search":
      url = "/search";
      break;
    case "kbanswer":
      url = "/kbanswer";
      break;
    case "answer":
      url = "/answer";
      break;
    default:
      url = "/answer";
  }

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    hideLoading();

    if (xhr.status === 200) {
      try {
        let response = JSON.parse(xhr.responseText);
        displayMessage("assistant", response.message, response.response_type);
      } catch (e) {
        showError("Invalid response from server");
      }
    } else {
      showError(`Error: ${xhr.status} - ${xhr.statusText}`);
    }
  };

  xhr.onerror = function () {
    hideLoading();
    showError("Network error. Please check your connection.");
  };

  xhr.ontimeout = function () {
    hideLoading();
    showError(
      "Request timeout. Knowledge base queries can take up to 60 seconds. Please try again or ask a simpler question."
    );
  };

  xhr.timeout = 60000; // 60 second timeout for knowledge base queries

  xhr.send(JSON.stringify({ message: message }));
}

function displayMessage(sender, message, responseType = null) {
  let chatContainer = document.getElementById("chat-container");
  let messageDiv = document.createElement("div");

  if (sender === "assistant") {
    messageDiv.classList.add("assistant-message");

    // Create a span for the Chatbot text with response type indicator
    let chatbotSpan = document.createElement("span");
    let responseIndicator = "";

    if (responseType) {
      switch (responseType) {
        case "chatbot":
          responseIndicator = "🤖 ThinkBot (General AI chatbot): ";
          messageDiv.style.borderLeft = "4px solid #007bff";
          break;
        case "knowledge_base":
          responseIndicator = "📚 ThinkBot (Knowledge Base): ";
          messageDiv.style.borderLeft = "4px solid #28a745";
          break;
        case "search":
          responseIndicator = "🔍 ThinkBot (Knowledge Base Search Results): ";
          messageDiv.style.borderLeft = "4px solid #ffc107";
          break;
        default:
          responseIndicator = "🤖 ThinkBot: ";
      }
    } else {
      responseIndicator = "🤖 ThinkBot: ";
    }

    chatbotSpan.innerHTML = `<b>${responseIndicator}</b>`;
    messageDiv.appendChild(chatbotSpan);

    // Append the message to the Chatbot span
    messageDiv.innerHTML += message;
  } else {
    messageDiv.classList.add("user-message");

    let userSpan = document.createElement("span");
    userSpan.innerHTML = "<b>👤 You:</b> ";
    messageDiv.appendChild(userSpan);

    // Append the message to the span
    messageDiv.innerHTML += message;
  }

  // Create a timestamp element
  let timestamp = document.createElement("span");
  timestamp.classList.add("timestamp");
  timestamp.style.fontSize = "0.8em";
  timestamp.style.opacity = "0.7";
  let currentTime = new Date().toLocaleTimeString();
  timestamp.innerText = " [" + currentTime + "]";
  messageDiv.appendChild(timestamp);

  chatContainer.appendChild(messageDiv);

  // Auto-scroll to the bottom of the chat container
  setTimeout(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 100);
}

function showLoading() {
  isLoading = true;
  let sendButton = document.getElementById("send-btn");
  let originalText = sendButton.innerHTML;
  let functionSelect = document.getElementById("function-select");
  let selectedFunction = functionSelect.value;

  // Different loading messages based on function
  let loadingText = "Processing...";
  if (selectedFunction === "kbanswer" || selectedFunction === "search") {
    loadingText = "Searching knowledge base...";
    // Start progress timer for knowledge base queries
    startTime = Date.now();
    progressInterval = setInterval(() => {
      let elapsed = Math.floor((Date.now() - startTime) / 1000);
      sendButton.innerHTML = `<span class="loading"></span> ${loadingText} (${elapsed}s)`;
    }, 1000);
  } else {
    sendButton.innerHTML = '<span class="loading"></span> ' + loadingText;
  }

  sendButton.disabled = true;

  // Store original text to restore later
  sendButton.setAttribute("data-original-text", originalText);
}

function hideLoading() {
  isLoading = false;
  let sendButton = document.getElementById("send-btn");
  let originalText = sendButton.getAttribute("data-original-text") || "Send";
  sendButton.innerHTML = originalText;
  sendButton.disabled = false;

  // Clear progress timer if running
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  startTime = null;
}

function showError(message) {
  let chatContainer = document.getElementById("chat-container");
  let errorDiv = document.createElement("div");
  errorDiv.classList.add("assistant-message");
  errorDiv.style.borderLeft = "4px solid #dc3545";
  errorDiv.style.backgroundColor = "#f8d7da";
  errorDiv.style.color = "#721c24";

  errorDiv.innerHTML = `<b>⚠️ Error:</b> ${message}`;

  chatContainer.appendChild(errorDiv);

  // Auto-scroll to show error
  setTimeout(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 100);
}

function clearChat() {
  let chatContainer = document.getElementById("chat-container");
  chatContainer.innerHTML = "";

  // Add welcome message
  displayMessage(
    "assistant",
    "Hello! I'm ThinkBot, your AI assistant. How can I help you today? You can ask me general questions or use the dropdown to access specific features.",
    "chatbot"
  );
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Handle send button click
  let sendButton = document.getElementById("send-btn");
  sendButton.addEventListener("click", sendMessage);

  // Handle clear button click
  let clearButton = document.getElementById("clear-btn");
  clearButton.addEventListener("click", clearChat);

  // Handle Enter key press
  let messageInput = document.getElementById("message-input");
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Handle function select change
  let functionSelect = document.getElementById("function-select");
  functionSelect.addEventListener("change", function () {
    let selectedFunction = functionSelect.value;
    let messageInput = document.getElementById("message-input");

    // Update placeholder based on selected function
    switch (selectedFunction) {
      case "search":
        messageInput.placeholder = "Search the knowledge base...";
        break;
      case "kbanswer":
        messageInput.placeholder = "Ask a question from the knowledge base...";
        break;
      case "answer":
      default:
        messageInput.placeholder = "Ask me anything...";
        break;
    }
  });

  // Show welcome message on page load
  setTimeout(() => {
    displayMessage(
      "assistant",
      "Hello! I'm ThinkBot, your AI assistant. How can I help you today? You can ask me general questions or use the dropdown to access specific features.",
      "chatbot"
    );
  }, 500);
});
