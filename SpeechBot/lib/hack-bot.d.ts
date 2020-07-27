/// <reference types="node" />
import { ActivityHandler, TurnContext } from 'botbuilder';
import { PushAudioInputStream } from 'microsoft-cognitiveservices-speech-sdk';
export declare class HackDevOpsBot extends ActivityHandler {
    private context;
    private next;
    private _speechToTextConversionCompleted;
    private _prevReply;
    constructor();
    onMessageHandler(context: TurnContext, next: any): Promise<void>;
    hasAudioAttachement(context: TurnContext): boolean;
    getAudioStreamFromMessage(context: TurnContext): Promise<void>;
    readAudioStream(readableStream: NodeJS.ReadableStream): Promise<PushAudioInputStream>;
    replyToBot(reply: string): void;
}
