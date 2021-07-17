import { getListenerMap } from './listenerUtils';
export class MessagingService {
    private static messagingServiceInstance: MessagingService;

    public static getInstance(): MessagingService {
        if (!this.messagingServiceInstance) {
            this.messagingServiceInstance = new MessagingService();
        }
        return this.messagingServiceInstance;
    }

    private listenerOn: boolean;

    private constructor() {
        this.listenerOn = false;
    }

    sendMessage(message: any): Promise<any> {
        return new Promise(function (res) {
            chrome.runtime.sendMessage(message, function (response) {
                return res(response);
            });
        });
    }

    startListening() {
        if (this.listenerOn) return;
        this.listenerOn = true;
        const listenerMap = getListenerMap();
        chrome.runtime.onMessage.addListener(function (message, sender, resp) {
            const handler = listenerMap.get(message.type);
            if (!handler) return;
            handler(message, sender, resp);
        });
    }
}
