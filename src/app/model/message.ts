export interface Message {
    senderId: string;
    receiverId: string;
    messageText: string;
    date: string;
    isSender?: boolean;
}
