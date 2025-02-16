import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotComponent, CommonModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle chat visibility', () => {
    expect(component.isChatOpen).toBeFalse();
    component.toggleChat();
    expect(component.isChatOpen).toBeTrue();
  });

  it('should send a user message and receive a bot response', (done) => {
    component.userMessage = 'Hello!';
    component.sendMessage();

    expect(component.messages.length).toBe(2); // User message + bot response
    expect(component.messages[0].text).toBe('Bienvenue ! Comment puis-je vous aider ?');
    expect(component.messages[1].text).toBe('Hello!');

    setTimeout(() => {
      expect(component.messages.length).toBe(3); // Bot response added
      expect(component.messages[2].text).toBe('Je suis un chatbot ! 😊');
      done();
    }, 1000);
  });
});
