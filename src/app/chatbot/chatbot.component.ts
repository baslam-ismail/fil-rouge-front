import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isChatOpen = false;
  userMessage = '';
  messages: { sender: string; text: string }[] = [
    { sender: 'bot', text: 'Bienvenue ! Comment puis-je vous aider ?' }
  ];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      // Ajouter le message de l'utilisateur
      this.messages.push({ sender: 'user', text: this.userMessage });
      this.userMessage = '';

      // Ajouter une réponse du chatbot après un délai
      setTimeout(() => {
        this.messages.push({ sender: 'bot', text: 'Je suis un chatbot ! 😊' });
      }, 1000);
    }
  }
}