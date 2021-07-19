import { workflow } from '../../../constants';

export function requestHandler(message: any, sender: chrome.runtime.MessageSender, resp: (response?: any) => void) {
    switch (message.resource) {
        case 'workflow':
            resp(workflow);
            break;
    }
}
