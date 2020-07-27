import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
export declare class SpeechToText {
    private callback;
    convertSpeechToText(audioStream: sdk.PushAudioInputStream, callback: any): Promise<string>;
}
