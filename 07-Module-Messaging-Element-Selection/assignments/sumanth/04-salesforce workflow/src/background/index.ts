import { MessagingService } from '../popup/utils/chrome.message';

function listenToMessages() {
    const messagingService = MessagingService.getInstance();
    messagingService.startListening();
}

listenToMessages();

export {};
