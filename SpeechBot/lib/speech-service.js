"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechToText = void 0;
const sdk = require("microsoft-cognitiveservices-speech-sdk");
class SpeechToText {
    convertSpeechToText(audioStream, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // now create the audio-config pointing to our stream and
                // the speech config specifying the language.
                this.callback = callback;
                var audioConfig = sdk.AudioConfig.fromStreamInput(audioStream);
                // CongnitiveService Name: HackBot-Speech
                var speechConfig = sdk.SpeechConfig.fromSubscription('e5de30b9ee4b488592f5b758c7d5a0f3', 'eastus');
                // setting the recognition language to English.
                speechConfig.speechRecognitionLanguage = 'en-US';
                // create the speech recognizer.
                var reco = new sdk.SpeechRecognizer(speechConfig, audioConfig);
                reco.recognizing = function (s, e) {
                    var str = "(recognizing) Reason: " + sdk.ResultReason[e.result.reason] + " Text: " + e.result.text;
                    console.log(str);
                };
                reco.recognized = function (s, e) {
                    // Indicates that recognizable speech was not detected, and that recognition is done.
                    if (e.result.reason === sdk.ResultReason.NoMatch) {
                        var noMatchDetail = sdk.NoMatchDetails.fromResult(e.result);
                        console.log("\r\n(recognized)  Reason: " + sdk.ResultReason[e.result.reason] + " NoMatchReason: " + sdk.NoMatchReason[noMatchDetail.reason]);
                    }
                    else {
                        console.log("\r\n(recognized)  Reason: " + sdk.ResultReason[e.result.reason] + " Text: " + e.result.text);
                    }
                };
                reco.sessionStarted = function (s, e) {
                    var str = "(sessionStarted) SessionId: " + e.sessionId;
                    console.log(str);
                };
                // Signals the end of a session with the speech service.
                reco.sessionStopped = function (s, e) {
                    var str = "(sessionStopped) SessionId: " + e.sessionId;
                    console.log(str);
                };
                // Signals that the speech service has started to detect speech.
                reco.speechStartDetected = function (s, e) {
                    var str = "(speechStartDetected) SessionId: " + e.sessionId;
                    console.log(str);
                };
                // Signals that the speech service has detected that speech has stopped.
                reco.speechEndDetected = function (s, e) {
                    var str = "(speechEndDetected) SessionId: " + e.sessionId;
                    console.log(str);
                };
                reco.recognizeOnceAsync(function (result) {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log("Final text is: " + result.text);
                        reco.close();
                        resolve(result.text);
                        // callback(result.text);
                        //  context.sendActivity((MessageFactory.text(result.text, result.text)))
                        reco = undefined;
                    });
                }, function (err) {
                    console.log("Error detected!" + JSON.stringify(err));
                    reco.close();
                    reco = undefined;
                    reject(err);
                });
            });
        });
    }
}
exports.SpeechToText = SpeechToText;
//# sourceMappingURL=speech-service.js.map