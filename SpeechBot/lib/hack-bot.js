"use strict";
// // Copyright (c) Microsoft Corporation. All rights reserved.
// // Licensed under the MIT License.
//var bufferToArrayBuffer = require('buffer-to-arraybuffer');
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
exports.HackDevOpsBot = void 0;
const botbuilder_1 = require("botbuilder");
const needle = require("needle");
const speech_service_1 = require("./speech-service");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
class HackDevOpsBot extends botbuilder_1.ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(this.onMessageHandler.bind(this)
        // async (context, next) => {
        // if (this.hasAudioAttachement(context)) {
        // }
        // // const replyText = `Echo: ${context.activity.text}`;
        // // await context.sendActivity(MessageFactory.text(replyText, replyText));
        // // By calling next() you ensure that the next BotHandler is run.
        // await next();
        //}
        );
        this.onMembersAdded((context, next) => __awaiter(this, void 0, void 0, function* () {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    yield context.sendActivity(botbuilder_1.MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            yield next();
        }));
    }
    onMessageHandler(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //await this.getAudioStreamFromMessage(context)
            //await this.ConvertAudioToText(context);
            this.context = context;
            this.next = next;
            yield this.getAudioStreamFromMessage(context);
            yield next();
        });
    }
    hasAudioAttachement(context) {
        if (context.activity.attachments && context.activity.attachments.length > 0 && (context.activity.attachments[0].contentType == 'audio/wav'
            || context.activity.attachments[0].contentType == 'application/octet-stream')) {
            return true;
        }
        return false;
    }
    getAudioStreamFromMessage(context) {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            this._speechToTextConversionCompleted = false;
            if (this.hasAudioAttachement(context)) {
                console.log("Extract audio");
                const audioAttachement = context.activity.attachments[0];
                const contentUrl = audioAttachement.contentUrl;
                let headers = {};
                headers['Content-Type'] = audioAttachement.contentType;
                var readableStream = needle.get(contentUrl, { headers: headers });
                // var pushStream = sdk.AudioInputStream.createPushStream();
                // readableStream.on('data', async function (arrayBuffer) {
                //     pushStream.write(arrayBuffer.slice());
                // }).on('end', async () => {
                //     pushStream.close();
                //     console.log("Printing");
                //     var speechService = new SpeechToText();
                //     speechService.convertSpeechToText(pushStream, self.replyToBot.bind(self));
                //     //  callback(pushStream);
                // });
                var pushStream = yield this.readAudioStream(readableStream);
                var speechService = new speech_service_1.SpeechToText();
                var text = yield speechService.convertSpeechToText(pushStream, self.replyToBot.bind(self));
                yield context.sendActivity(botbuilder_1.MessageFactory.text(text, text));
                // await self.context.sendActivity(MessageFactory.text("Task Submitted. You will receive notification once done!", "Task Submitted"));
            }
            else {
                yield self.context.sendActivity(botbuilder_1.MessageFactory.text(this._prevReply, this._prevReply));
            }
            // while (!this._speechToTextConversionCompleted);
        });
    }
    readAudioStream(readableStream) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var pushStream = sdk.AudioInputStream.createPushStream();
                readableStream.on('data', function (arrayBuffer) {
                    return __awaiter(this, void 0, void 0, function* () {
                        pushStream.write(arrayBuffer.slice());
                    });
                }).on('end', () => __awaiter(this, void 0, void 0, function* () {
                    pushStream.close();
                    // console.log("Printing");
                    resolve(pushStream);
                    //  callback(pushStream);
                }));
            });
        });
    }
    replyToBot(reply) {
        console.log("Bot reply " + reply);
        //this._prevReply = reply;
        // await this.context.sendActivity(MessageFactory.text(reply, reply));
        //await this.next();
    }
}
exports.HackDevOpsBot = HackDevOpsBot;
//# sourceMappingURL=hack-bot.js.map