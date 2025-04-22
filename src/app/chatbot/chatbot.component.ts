import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  messages = [
    { text: 'Bonjour ! Comment puis-je vous aider ?', sender: 'bot' }
  ];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat(event: MouseEvent) {
    // Fermer le chat uniquement si on clique sur l'overlay, pas sur la fenêtre du chat
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.isChatOpen = false;
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      // Ajouter le message de l'utilisateur
      this.messages.push({ text: this.userMessage, sender: 'user' });

      // Simuler une réponse du bot
      setTimeout(() => {
        this.messages.push({
          text: 'Je suis désolé, je suis un chatbot de démonstration. Je ne peux pas vraiment vous aider pour le moment.',
          sender: 'bot'
        });
      }, 1000);

      this.userMessage = '';
    }
  }
}
