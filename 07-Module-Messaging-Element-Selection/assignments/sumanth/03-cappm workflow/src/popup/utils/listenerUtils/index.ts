import { requestHandler } from './listenerHandlers';

export function getListenerMap(): Map<string, Function> {
    const listenerMap = new Map<string, Function>();
    listenerMap.set('request', requestHandler);
    return listenerMap;
}
