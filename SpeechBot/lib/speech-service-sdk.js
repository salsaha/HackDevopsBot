"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechToText = void 0;
const sdk = require("microsoft-cognitiveservices-speech-sdk");
class SpeechToText {
    convertSpeechToText(audioStream) {
        // now create the audio-config pointing to our stream and
        // the speech config specifying the language.
        var audioConfig = sdk.AudioConfig.fromStreamInput(audioStream);
        var speechConfig = sdk.SpeechConfig.fromSubscription('e5de30b9ee4b488592f5b758c7d5a0f3', 'eastus');
        // setting the recognition language to English.
        speechConfig.speechRecognitionLanguage = 'en-US';
        // create the speech recognizer.
        var reco = new sdk.SpeechRecognizer(speechConfig, audioConfig);
        // Before beginning speech recognition, setup the callbacks to be invoked when an event occurs.
        // The event recognizing signals that an intermediate recognition result is received.
        // You will receive one or more recognizing events as a speech phrase is recognized, with each containing
        // more recognized speech. The event will contain the text for the recognition since the last phrase was recognized.
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
            console.log("Final text is: " + result.text);
            reco.close();
            reco = undefined;
        }, function (err) {
            console.log("Error detected!");
            reco.close();
            reco = undefined;
        });
    }
}
exports.SpeechToText = SpeechToText;
//# sourceMappingURL=speech-service-sdk.js.map