"use strict";
/*
 * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Session = void 0;
var Connection_1 = require("./Connection");
var Filter_1 = require("./Filter");
var Subscriber_1 = require("./Subscriber");
var EventDispatcher_1 = require("./EventDispatcher");
var ConnectionEvent_1 = require("../OpenViduInternal/Events/ConnectionEvent");
var FilterEvent_1 = require("../OpenViduInternal/Events/FilterEvent");
var RecordingEvent_1 = require("../OpenViduInternal/Events/RecordingEvent");
var SessionDisconnectedEvent_1 = require("../OpenViduInternal/Events/SessionDisconnectedEvent");
var SignalEvent_1 = require("../OpenViduInternal/Events/SignalEvent");
var StreamEvent_1 = require("../OpenViduInternal/Events/StreamEvent");
var StreamPropertyChangedEvent_1 = require("../OpenViduInternal/Events/StreamPropertyChangedEvent");
var ConnectionPropertyChangedEvent_1 = require("../OpenViduInternal/Events/ConnectionPropertyChangedEvent");
var NetworkQualityLevelChangedEvent_1 = require("../OpenViduInternal/Events/NetworkQualityLevelChangedEvent");
var OpenViduError_1 = require("../OpenViduInternal/Enums/OpenViduError");
var VideoInsertMode_1 = require("../OpenViduInternal/Enums/VideoInsertMode");
var OpenViduLogger_1 = require("../OpenViduInternal/Logger/OpenViduLogger");
var Platform_1 = require("../OpenViduInternal/Utils/Platform");
/**
 * @hidden
 */
var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
/**
 * @hidden
 */
var platform;
/**
 * Represents a video call. It can also be seen as a videoconference room where multiple users can connect.
 * Participants who publish their videos to a session can be seen by the rest of users connected to that specific session.
 * Initialized with [[OpenVidu.initSession]] method.
 *
 * ### Available event listeners (and events dispatched)
 *
 * - connectionCreated ([[ConnectionEvent]])
 * - connectionDestroyed ([[ConnectionEvent]])
 * - connectionPropertyChanged ([[ConnectionPropertyChangedEvent]]) <a href="https://docs.openvidu.io/en/stable/openvidu-pro/" target="_blank" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-right: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif">PRO</a>
 * - sessionDisconnected ([[SessionDisconnectedEvent]])
 * - streamCreated ([[StreamEvent]])
 * - streamDestroyed ([[StreamEvent]])
 * - streamPropertyChanged ([[StreamPropertyChangedEvent]])
 * - publisherStartSpeaking ([[PublisherSpeakingEvent]])
 * - publisherStopSpeaking ([[PublisherSpeakingEvent]])
 * - signal ([[SignalEvent]])
 * - recordingStarted ([[RecordingEvent]])
 * - recordingStopped ([[RecordingEvent]])
 * - networkQualityLevelChanged ([[NetworkQualityLevelChangedEvent]])
 * - reconnecting
 * - reconnected
 */
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    /**
     * @hidden
     */
    function Session(openvidu) {
        var _this = _super.call(this) || this;
        /**
         * Collection of all StreamManagers of this Session ([[Publisher]] and [[Subscriber]])
         */
        _this.streamManagers = [];
        // This map is only used to avoid race condition between 'joinRoom' response and 'onParticipantPublished' notification
        /**
         * @hidden
         */
        _this.remoteStreamsCreated = new Map();
        /**
         * @hidden
         */
        _this.isFirstIonicIosSubscriber = true;
        /**
         * @hidden
         */
        _this.countDownForIonicIosSubscribersActive = true;
        /**
         * @hidden
         */
        _this.remoteConnections = new Map();
        /**
         * @hidden
         */
        _this.startSpeakingEventsEnabled = false;
        /**
         * @hidden
         */
        _this.startSpeakingEventsEnabledOnce = false;
        /**
         * @hidden
         */
        _this.stopSpeakingEventsEnabled = false;
        /**
         * @hidden
         */
        _this.stopSpeakingEventsEnabledOnce = false;
        platform = Platform_1.PlatformUtils.getInstance();
        _this.openvidu = openvidu;
        return _this;
    }
    /**
     * Connects to the session using `token`. Parameter `metadata` allows you to pass extra data to share with other users when
     * they receive `streamCreated` event. The structure of `metadata` string is up to you (maybe some standardized format
     * as JSON or XML is a good idea).
     *
     * This metadata is not considered secure, as it is generated in the client side. To pass secure data, add it as a parameter in the
     * token generation operation (through the API REST, openvidu-java-client or openvidu-node-client).
     *
     * Only after the returned Promise is successfully resolved [[Session.connection]] object will be available and properly defined.
     *
     * #### Events dispatched
     *
     * The [[Session]] object of the local participant will first dispatch one or more `connectionCreated` events upon successful termination of this method:
     * - First one for your own local Connection object, so you can retrieve [[Session.connection]] property.
     * - Then one for each remote Connection previously connected to the Session, if any. Any other remote user connecting to the Session after you have
     * successfully connected will also dispatch a `connectionCreated` event when they do so.
     *
     * The [[Session]] object of the local participant will also dispatch a `streamCreated` event for each remote active [[Publisher]] that was already streaming
     * when connecting, just after dispatching all remote `connectionCreated` events.
     *
     * The [[Session]] object of every other participant connected to the session will dispatch a `connectionCreated` event.
     *
     * See [[ConnectionEvent]] and [[StreamEvent]] to learn more.
     *
     * @returns A Promise to which you must subscribe that is resolved if the the connection to the Session was successful and rejected with an Error object if not
     *
     */
    Session.prototype.connect = function (token, metadata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.processToken(token);
            if (_this.openvidu.checkSystemRequirements()) {
                // Early configuration to deactivate automatic subscription to streams
                _this.options = {
                    sessionId: _this.sessionId,
                    participantId: token,
                    metadata: !!metadata ? _this.stringClientMetadata(metadata) : ''
                };
                _this.connectAux(token).then(function () {
                    resolve();
                })["catch"](function (error) {
                    reject(error);
                });
            }
            else {
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.BROWSER_NOT_SUPPORTED, 'Browser ' + platform.getName() + ' (version ' + platform.getVersion() + ') for ' + platform.getFamily() + ' is not supported in OpenVidu'));
            }
        });
    };
    /**
     * Leaves the session, destroying all streams and deleting the user as a participant.
     *
     * #### Events dispatched
     *
     * The [[Session]] object of the local participant will dispatch a `sessionDisconnected` event.
     * This event will automatically unsubscribe the leaving participant from every Subscriber object of the session (this includes closing the WebRTCPeer connection and disposing all MediaStreamTracks)
     * and also deletes any HTML video element associated to each Subscriber (only those [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
     * For every video removed, each Subscriber object will dispatch a `videoElementDestroyed` event.
     * Call `event.preventDefault()` upon event `sessionDisconnected` to avoid this behavior and take care of disposing and cleaning all the Subscriber objects yourself.
     * See [[SessionDisconnectedEvent]] and [[VideoElementEvent]] to learn more to learn more.
     *
     * The [[Publisher]] object of the local participant will dispatch a `streamDestroyed` event if there is a [[Publisher]] object publishing to the session.
     * This event will automatically stop all media tracks and delete any HTML video element associated to it (only those [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
     * For every video removed, the Publisher object will dispatch a `videoElementDestroyed` event.
     * Call `event.preventDefault()` upon event `streamDestroyed` if you want to clean the Publisher object on your own or re-publish it in a different Session (to do so it is a mandatory requirement to call `Session.unpublish()`
     * or/and `Session.disconnect()` in the previous session). See [[StreamEvent]] and [[VideoElementEvent]] to learn more.
     *
     * The [[Session]] object of every other participant connected to the session will dispatch a `streamDestroyed` event if the disconnected participant was publishing.
     * This event will automatically unsubscribe the Subscriber object from the session (this includes closing the WebRTCPeer connection and disposing all MediaStreamTracks)
     * and also deletes any HTML video element associated to that Subscriber (only those [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
     * For every video removed, the Subscriber object will dispatch a `videoElementDestroyed` event.
     * Call `event.preventDefault()` upon event `streamDestroyed` to avoid this default behavior and take care of disposing and cleaning the Subscriber object yourself.
     * See [[StreamEvent]] and [[VideoElementEvent]] to learn more.
     *
     * The [[Session]] object of every other participant connected to the session will dispatch a `connectionDestroyed` event in any case. See [[ConnectionEvent]] to learn more.
     */
    Session.prototype.disconnect = function () {
        this.leave(false, 'disconnect');
    };
    /**
     * Subscribes to a `stream`, adding a new HTML video element to DOM with `subscriberProperties` settings. This method is usually called in the callback of `streamCreated` event.
     *
     * #### Events dispatched
     *
     * The [[Subscriber]] object will dispatch a `videoElementCreated` event once the HTML video element has been added to DOM (only if you
     * [let OpenVidu take care of the video players](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)). See [[VideoElementEvent]] to learn more.
     *
     * The [[Subscriber]] object will dispatch a `streamPlaying` event once the remote stream starts playing. See [[StreamManagerEvent]] to learn more.
     *
     * @param stream Stream object to subscribe to
     * @param targetElement HTML DOM element (or its `id` attribute) in which the video element of the Subscriber will be inserted (see [[SubscriberProperties.insertMode]]). If *null* or *undefined* no default video will be created for this Subscriber.
     * You can always call method [[Subscriber.addVideoElement]] or [[Subscriber.createVideoElement]] to manage the video elements on your own (see [Manage video players](/en/stable/cheatsheet/manage-videos) section)
     * @param completionHandler `error` parameter is null if `subscribe` succeeds, and is defined if it fails.
     */
    Session.prototype.subscribe = function (stream, targetElement, param3, param4) {
        var properties = {};
        if (!!param3 && typeof param3 !== 'function') {
            properties = {
                insertMode: (typeof param3.insertMode !== 'undefined') ? ((typeof param3.insertMode === 'string') ? VideoInsertMode_1.VideoInsertMode[param3.insertMode] : properties.insertMode) : VideoInsertMode_1.VideoInsertMode.APPEND,
                subscribeToAudio: (typeof param3.subscribeToAudio !== 'undefined') ? param3.subscribeToAudio : true,
                subscribeToVideo: (typeof param3.subscribeToVideo !== 'undefined') ? param3.subscribeToVideo : true
            };
        }
        else {
            properties = {
                insertMode: VideoInsertMode_1.VideoInsertMode.APPEND,
                subscribeToAudio: true,
                subscribeToVideo: true
            };
        }
        var completionHandler;
        if (!!param3 && (typeof param3 === 'function')) {
            completionHandler = param3;
        }
        else if (!!param4) {
            completionHandler = param4;
        }
        logger.info('Subscribing to ' + stream.connection.connectionId);
        stream.subscribe()
            .then(function () {
            logger.info('Subscribed correctly to ' + stream.connection.connectionId);
            if (completionHandler !== undefined) {
                completionHandler(undefined);
            }
        })["catch"](function (error) {
            if (completionHandler !== undefined) {
                completionHandler(error);
            }
        });
        var subscriber = new Subscriber_1.Subscriber(stream, targetElement, properties);
        if (!!subscriber.targetElement) {
            stream.streamManager.createVideoElement(subscriber.targetElement, properties.insertMode);
        }
        return subscriber;
    };
    Session.prototype.subscribeAsync = function (stream, targetElement, properties) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var subscriber;
            var callback = function (error) {
                if (!!error) {
                    reject(error);
                }
                else {
                    resolve(subscriber);
                }
            };
            if (!!properties) {
                subscriber = _this.subscribe(stream, targetElement, properties, callback);
            }
            else {
                subscriber = _this.subscribe(stream, targetElement, callback);
            }
        });
    };
    /**
     * Unsubscribes from `subscriber`, automatically removing its associated HTML video elements.
     *
     * #### Events dispatched
     *
     * The [[Subscriber]] object will dispatch a `videoElementDestroyed` event for each video associated to it that was removed from DOM.
     * Only videos [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)) will be automatically removed
     *
     * See [[VideoElementEvent]] to learn more
     */
    Session.prototype.unsubscribe = function (subscriber) {
        var connectionId = subscriber.stream.connection.connectionId;
        logger.info('Unsubscribing from ' + connectionId);
        this.openvidu.sendRequest('unsubscribeFromVideo', { sender: subscriber.stream.connection.connectionId }, function (error, response) {
            if (error) {
                logger.error('Error unsubscribing from ' + connectionId, error);
            }
            else {
                logger.info('Unsubscribed correctly from ' + connectionId);
            }
            subscriber.stream.disposeWebRtcPeer();
            subscriber.stream.disposeMediaStream();
        });
        subscriber.stream.streamManager.removeAllVideos();
    };
    /**
     * Publishes to the Session the Publisher object
     *
     * #### Events dispatched
     *
     * The local [[Publisher]] object will dispatch a `streamCreated` event upon successful termination of this method. See [[StreamEvent]] to learn more.
     *
     * The local [[Publisher]] object will dispatch a `streamPlaying` once the media stream starts playing. See [[StreamManagerEvent]] to learn more.
     *
     * The [[Session]] object of every other participant connected to the session will dispatch a `streamCreated` event so they can subscribe to it. See [[StreamEvent]] to learn more.
     *
     * @returns A Promise (to which you can optionally subscribe to) that is resolved only after the publisher was successfully published and rejected with an Error object if not
     */
    Session.prototype.publish = function (publisher) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            publisher.session = _this;
            publisher.stream.session = _this;
            if (!publisher.stream.publishedOnce) {
                // 'Session.unpublish(Publisher)' has NOT been called
                _this.connection.addStream(publisher.stream);
                publisher.stream.publish()
                    .then(function () {
                    _this.sendVideoData(publisher, 8, true, 5);
                    resolve();
                })["catch"](function (error) {
                    reject(error);
                });
            }
            else {
                // 'Session.unpublish(Publisher)' has been called. Must initialize again Publisher
                publisher.initialize()
                    .then(function () {
                    _this.connection.addStream(publisher.stream);
                    publisher.reestablishStreamPlayingEvent();
                    publisher.stream.publish()
                        .then(function () {
                        _this.sendVideoData(publisher, 8, true, 5);
                        resolve();
                    })["catch"](function (error) {
                        reject(error);
                    });
                })["catch"](function (error) {
                    reject(error);
                });
            }
        });
    };
    /**
     * Unpublishes from the Session the Publisher object.
     *
     * #### Events dispatched
     *
     * The [[Publisher]] object of the local participant will dispatch a `streamDestroyed` event.
     * This event will automatically stop all media tracks and delete any HTML video element associated to this Publisher
     * (only those videos [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
     * For every video removed, the Publisher object will dispatch a `videoElementDestroyed` event.
     * Call `event.preventDefault()` upon event `streamDestroyed` if you want to clean the Publisher object on your own or re-publish it in a different Session.
     *
     * The [[Session]] object of every other participant connected to the session will dispatch a `streamDestroyed` event.
     * This event will automatically unsubscribe the Subscriber object from the session (this includes closing the WebRTCPeer connection and disposing all MediaStreamTracks) and
     * delete any HTML video element associated to it (only those [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
     * For every video removed, the Subscriber object will dispatch a `videoElementDestroyed` event.
     * Call `event.preventDefault()` upon event `streamDestroyed` to avoid this default behavior and take care of disposing and cleaning the Subscriber object on your own.
     *
     * See [[StreamEvent]] and [[VideoElementEvent]] to learn more.
     */
    Session.prototype.unpublish = function (publisher) {
        var stream = publisher.stream;
        if (!stream.connection) {
            logger.error('The associated Connection object of this Publisher is null', stream);
            return;
        }
        else if (stream.connection !== this.connection) {
            logger.error('The associated Connection object of this Publisher is not your local Connection.' +
                "Only moderators can force unpublish on remote Streams via 'forceUnpublish' method", stream);
            return;
        }
        else {
            logger.info('Unpublishing local media (' + stream.connection.connectionId + ')');
            this.openvidu.sendRequest('unpublishVideo', function (error, response) {
                if (error) {
                    logger.error(error);
                }
                else {
                    logger.info('Media unpublished correctly');
                }
            });
            stream.disposeWebRtcPeer();
            delete stream.connection.stream;
            var streamEvent = new StreamEvent_1.StreamEvent(true, publisher, 'streamDestroyed', publisher.stream, 'unpublish');
            publisher.emitEvent('streamDestroyed', [streamEvent]);
            streamEvent.callDefaultBehavior();
        }
    };
    /**
     * Forces some user to leave the session
     *
     * #### Events dispatched
     *
     * The behavior is the same as when some user calls [[Session.disconnect]], but `reason` property in all events will be `"forceDisconnectByUser"`.
     *
     * The [[Session]] object of every participant will dispatch a `streamDestroyed` event if the evicted user was publishing a stream, with property `reason` set to `"forceDisconnectByUser"`.
     * The [[Session]] object of every participant except the evicted one will dispatch a `connectionDestroyed` event for the evicted user, with property `reason` set to `"forceDisconnectByUser"`.
     *
     * If any, the [[Publisher]] object of the evicted participant will also dispatch a `streamDestroyed` event with property `reason` set to `"forceDisconnectByUser"`.
     * The [[Session]] object of the evicted participant will dispatch a `sessionDisconnected` event with property `reason` set to `"forceDisconnectByUser"`.
     *
     * See [[StreamEvent]], [[ConnectionEvent]] and [[SessionDisconnectedEvent]] to learn more.
     *
     * @returns A Promise (to which you can optionally subscribe to) that is resolved only after the participant has been successfully evicted from the session and rejected with an Error object if not
     */
    Session.prototype.forceDisconnect = function (connection) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            logger.info('Forcing disconnect for connection ' + connection.connectionId);
            _this.openvidu.sendRequest('forceDisconnect', { connectionId: connection.connectionId }, function (error, response) {
                if (error) {
                    logger.error('Error forcing disconnect for Connection ' + connection.connectionId, error);
                    if (error.code === 401) {
                        reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to force a disconnection"));
                    }
                    else {
                        reject(error);
                    }
                }
                else {
                    logger.info('Forcing disconnect correctly for Connection ' + connection.connectionId);
                    resolve();
                }
            });
        });
    };
    /**
     * Forces some user to unpublish a Stream
     *
     * #### Events dispatched
     *
     * The behavior is the same as when some user calls [[Session.unpublish]], but `reason` property in all events will be `"forceUnpublishByUser"`
     *
     * The [[Session]] object of every participant will dispatch a `streamDestroyed` event with property `reason` set to `"forceDisconnectByUser"`
     *
     * The [[Publisher]] object of the affected participant will also dispatch a `streamDestroyed` event with property `reason` set to `"forceDisconnectByUser"`
     *
     * See [[StreamEvent]] to learn more.
     *
     * @returns A Promise (to which you can optionally subscribe to) that is resolved only after the remote Stream has been successfully unpublished from the session and rejected with an Error object if not
     */
    Session.prototype.forceUnpublish = function (stream) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            logger.info('Forcing unpublish for stream ' + stream.streamId);
            _this.openvidu.sendRequest('forceUnpublish', { streamId: stream.streamId }, function (error, response) {
                if (error) {
                    logger.error('Error forcing unpublish for Stream ' + stream.streamId, error);
                    if (error.code === 401) {
                        reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to force an unpublishing"));
                    }
                    else {
                        reject(error);
                    }
                }
                else {
                    logger.info('Forcing unpublish correctly for Stream ' + stream.streamId);
                    resolve();
                }
            });
        });
    };
    /**
     * Sends one signal. `signal` object has the following optional properties:
     * ```json
     * {data:string, to:Connection[], type:string}
     * ```
     * All users subscribed to that signal (`session.on('signal:type', ...)` or `session.on('signal', ...)` for all signals) and whose Connection objects are in `to` array will receive it. Their local
     * Session objects will dispatch a `signal` or `signal:type` event. See [[SignalEvent]] to learn more.
     *
     * @returns A Promise (to which you can optionally subscribe to) that is resolved if the message successfully reached openvidu-server and rejected with an Error object if not. _This doesn't
     * mean that openvidu-server could resend the message to all the listed receivers._
     */
    /* tslint:disable:no-string-literal */
    Session.prototype.signal = function (signal) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var signalMessage = {};
            if (signal.to && signal.to.length > 0) {
                var connectionIds_1 = [];
                signal.to.forEach(function (connection) {
                    if (!!connection.connectionId) {
                        connectionIds_1.push(connection.connectionId);
                    }
                });
                signalMessage['to'] = connectionIds_1;
            }
            else {
                signalMessage['to'] = [];
            }
            signalMessage['data'] = signal.data ? signal.data : '';
            var typeAux = signal.type ? signal.type : 'signal';
            if (!!typeAux) {
                if (typeAux.substring(0, 7) !== 'signal:') {
                    typeAux = 'signal:' + typeAux;
                }
            }
            signalMessage['type'] = typeAux;
            _this.openvidu.sendRequest('sendMessage', {
                message: JSON.stringify(signalMessage)
            }, function (error, response) {
                if (!!error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    };
    /* tslint:enable:no-string-literal */
    /**
     * See [[EventDispatcher.on]]
     */
    Session.prototype.on = function (type, handler) {
        _super.prototype.onAux.call(this, type, "Event '" + type + "' triggered by 'Session'", handler);
        if (type === 'publisherStartSpeaking') {
            this.startSpeakingEventsEnabled = true;
            // If there are already available remote streams, enable hark 'speaking' event in all of them
            this.remoteConnections.forEach(function (remoteConnection) {
                if (!!remoteConnection.stream && remoteConnection.stream.hasAudio) {
                    remoteConnection.stream.enableStartSpeakingEvent();
                }
            });
        }
        if (type === 'publisherStopSpeaking') {
            this.stopSpeakingEventsEnabled = true;
            // If there are already available remote streams, enable hark 'stopped_speaking' event in all of them
            this.remoteConnections.forEach(function (remoteConnection) {
                if (!!remoteConnection.stream && remoteConnection.stream.hasAudio) {
                    remoteConnection.stream.enableStopSpeakingEvent();
                }
            });
        }
        return this;
    };
    /**
     * See [[EventDispatcher.once]]
     */
    Session.prototype.once = function (type, handler) {
        _super.prototype.onceAux.call(this, type, "Event '" + type + "' triggered once by 'Session'", handler);
        if (type === 'publisherStartSpeaking') {
            this.startSpeakingEventsEnabledOnce = true;
            // If there are already available remote streams, enable hark 'speaking' event in all of them once
            this.remoteConnections.forEach(function (remoteConnection) {
                if (!!remoteConnection.stream && remoteConnection.stream.hasAudio) {
                    remoteConnection.stream.enableOnceStartSpeakingEvent();
                }
            });
        }
        if (type === 'publisherStopSpeaking') {
            this.stopSpeakingEventsEnabledOnce = true;
            // If there are already available remote streams, enable hark 'stopped_speaking' event in all of them once
            this.remoteConnections.forEach(function (remoteConnection) {
                if (!!remoteConnection.stream && remoteConnection.stream.hasAudio) {
                    remoteConnection.stream.enableOnceStopSpeakingEvent();
                }
            });
        }
        return this;
    };
    /**
     * See [[EventDispatcher.off]]
     */
    Session.prototype.off = function (type, handler) {
        _super.prototype.off.call(this, type, handler);
        if (type === 'publisherStartSpeaking') {
            var remainingStartSpeakingListeners = this.ee.getListeners(type).length;
            if (remainingStartSpeakingListeners === 0) {
                this.startSpeakingEventsEnabled = false;
                // If there are already available remote streams, disable hark in all of them
                this.remoteConnections.forEach(function (remoteConnection) {
                    if (!!remoteConnection.stream) {
                        remoteConnection.stream.disableStartSpeakingEvent(false);
                    }
                });
            }
        }
        if (type === 'publisherStopSpeaking') {
            var remainingStopSpeakingListeners = this.ee.getListeners(type).length;
            if (remainingStopSpeakingListeners === 0) {
                this.stopSpeakingEventsEnabled = false;
                // If there are already available remote streams, disable hark in all of them
                this.remoteConnections.forEach(function (remoteConnection) {
                    if (!!remoteConnection.stream) {
                        remoteConnection.stream.disableStopSpeakingEvent(false);
                    }
                });
            }
        }
        return this;
    };
    /* Hidden methods */
    /**
     * @hidden
     */
    Session.prototype.onParticipantJoined = function (response) {
        var _this = this;
        // Connection shouldn't exist
        this.getConnection(response.id, '')
            .then(function (connection) {
            logger.warn('Connection ' + response.id + ' already exists in connections list');
        })["catch"](function (openViduError) {
            var connection = new Connection_1.Connection(_this, response);
            _this.remoteConnections.set(response.id, connection);
            _this.ee.emitEvent('connectionCreated', [new ConnectionEvent_1.ConnectionEvent(false, _this, 'connectionCreated', connection, '')]);
        });
    };
    /**
     * @hidden
     */
    Session.prototype.onParticipantLeft = function (msg) {
        var _this = this;
        if (this.remoteConnections.size > 0) {
            this.getRemoteConnection(msg.connectionId).then(function (connection) {
                if (!!connection.stream) {
                    var stream = connection.stream;
                    var streamEvent = new StreamEvent_1.StreamEvent(true, _this, 'streamDestroyed', stream, msg.reason);
                    _this.ee.emitEvent('streamDestroyed', [streamEvent]);
                    streamEvent.callDefaultBehavior();
                    _this.remoteStreamsCreated["delete"](stream.streamId);
                    if (_this.remoteStreamsCreated.size === 0) {
                        _this.isFirstIonicIosSubscriber = true;
                        _this.countDownForIonicIosSubscribersActive = true;
                    }
                }
                _this.remoteConnections["delete"](connection.connectionId);
                _this.ee.emitEvent('connectionDestroyed', [new ConnectionEvent_1.ConnectionEvent(false, _this, 'connectionDestroyed', connection, msg.reason)]);
            })["catch"](function (openViduError) {
                logger.error(openViduError);
            });
        }
    };
    /**
     * @hidden
     */
    Session.prototype.onParticipantPublished = function (response) {
        var _this = this;
        var afterConnectionFound = function (connection) {
            _this.remoteConnections.set(connection.connectionId, connection);
            if (!_this.remoteStreamsCreated.get(connection.stream.streamId)) {
                // Avoid race condition between stream.subscribe() in "onParticipantPublished" and in "joinRoom" rpc callback
                // This condition is false if openvidu-server sends "participantPublished" event to a subscriber participant that has
                // already subscribed to certain stream in the callback of "joinRoom" method
                _this.ee.emitEvent('streamCreated', [new StreamEvent_1.StreamEvent(false, _this, 'streamCreated', connection.stream, '')]);
            }
            _this.remoteStreamsCreated.set(connection.stream.streamId, true);
        };
        // Get the existing Connection created on 'onParticipantJoined' for
        // existing participants or create a new one for new participants
        var connection;
        this.getRemoteConnection(response.id)
            .then(function (con) {
            // Update existing Connection
            connection = con;
            response.metadata = con.data;
            connection.remoteOptions = response;
            connection.initRemoteStreams(response.streams);
            afterConnectionFound(connection);
        })["catch"](function (openViduError) {
            // Create new Connection
            connection = new Connection_1.Connection(_this, response);
            afterConnectionFound(connection);
        });
    };
    /**
     * @hidden
     */
    Session.prototype.onParticipantUnpublished = function (msg) {
        var _this = this;
        if (msg.connectionId === this.connection.connectionId) {
            // Your stream has been forcedly unpublished from the session
            this.stopPublisherStream(msg.reason);
        }
        else {
            this.getRemoteConnection(msg.connectionId)
                .then(function (connection) {
                var streamEvent = new StreamEvent_1.StreamEvent(true, _this, 'streamDestroyed', connection.stream, msg.reason);
                _this.ee.emitEvent('streamDestroyed', [streamEvent]);
                streamEvent.callDefaultBehavior();
                // Deleting the remote stream
                var streamId = connection.stream.streamId;
                _this.remoteStreamsCreated["delete"](streamId);
                if (_this.remoteStreamsCreated.size === 0) {
                    _this.isFirstIonicIosSubscriber = true;
                    _this.countDownForIonicIosSubscribersActive = true;
                }
                connection.removeStream(streamId);
            })["catch"](function (openViduError) {
                logger.error(openViduError);
            });
        }
    };
    /**
     * @hidden
     */
    Session.prototype.onParticipantEvicted = function (msg) {
        if (msg.connectionId === this.connection.connectionId) {
            // You have been evicted from the session
            if (!!this.sessionId && !this.connection.disposed) {
                this.leave(true, msg.reason);
            }
        }
    };
    /**
     * @hidden
     */
    Session.prototype.onNewMessage = function (msg) {
        var _this = this;
        logger.info('New signal: ' + JSON.stringify(msg));
        var strippedType = !!msg.type ? msg.type.replace(/^(signal:)/, '') : undefined;
        if (!!msg.from) {
            // Signal sent by other client
            this.getConnection(msg.from, "Connection '" + msg.from + "' unknown when 'onNewMessage'. Existing remote connections: "
                + JSON.stringify(this.remoteConnections.keys()) + '. Existing local connection: ' + this.connection.connectionId)
                .then(function (connection) {
                _this.ee.emitEvent('signal', [new SignalEvent_1.SignalEvent(_this, strippedType, msg.data, connection)]);
                if (msg.type !== 'signal') {
                    _this.ee.emitEvent(msg.type, [new SignalEvent_1.SignalEvent(_this, strippedType, msg.data, connection)]);
                }
            })["catch"](function (openViduError) {
                logger.error(openViduError);
            });
        }
        else {
            // Signal sent by server
            this.ee.emitEvent('signal', [new SignalEvent_1.SignalEvent(this, strippedType, msg.data, undefined)]);
            if (msg.type !== 'signal') {
                this.ee.emitEvent(msg.type, [new SignalEvent_1.SignalEvent(this, strippedType, msg.data, undefined)]);
            }
        }
    };
    /**
     * @hidden
     */
    Session.prototype.onStreamPropertyChanged = function (msg) {
        var _this = this;
        var callback = function (connection) {
            if (!!connection.stream && connection.stream.streamId === msg.streamId) {
                var stream = connection.stream;
                var oldValue = void 0;
                switch (msg.property) {
                    case 'audioActive':
                        oldValue = stream.audioActive;
                        msg.newValue = msg.newValue === 'true';
                        stream.audioActive = msg.newValue;
                        break;
                    case 'videoActive':
                        oldValue = stream.videoActive;
                        msg.newValue = msg.newValue === 'true';
                        stream.videoActive = msg.newValue;
                        break;
                    case 'videoDimensions':
                        oldValue = stream.videoDimensions;
                        msg.newValue = JSON.parse(JSON.parse(msg.newValue));
                        stream.videoDimensions = msg.newValue;
                        break;
                    case 'filter':
                        oldValue = stream.filter;
                        msg.newValue = (Object.keys(msg.newValue).length > 0) ? msg.newValue : undefined;
                        if (msg.newValue !== undefined) {
                            stream.filter = new Filter_1.Filter(msg.newValue.type, msg.newValue.options);
                            stream.filter.stream = stream;
                            if (msg.newValue.lastExecMethod) {
                                stream.filter.lastExecMethod = msg.newValue.lastExecMethod;
                            }
                        }
                        else {
                            delete stream.filter;
                        }
                        msg.newValue = stream.filter;
                        break;
                }
                _this.ee.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this, stream, msg.property, msg.newValue, oldValue, msg.reason)]);
                if (!!stream.streamManager) {
                    stream.streamManager.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(stream.streamManager, stream, msg.property, msg.newValue, oldValue, msg.reason)]);
                }
            }
            else {
                logger.error("No stream with streamId '" + msg.streamId + "' found for connection '" + msg.connectionId + "' on 'streamPropertyChanged' event");
            }
        };
        if (msg.connectionId === this.connection.connectionId) {
            // Your stream has been forcedly changed (filter feature)
            callback(this.connection);
        }
        else {
            this.getRemoteConnection(msg.connectionId)
                .then(function (connection) {
                callback(connection);
            })["catch"](function (openViduError) {
                logger.error(openViduError);
            });
        }
    };
    /**
     * @hidden
     */
    Session.prototype.onConnectionPropertyChanged = function (msg) {
        var oldValue;
        switch (msg.property) {
            case 'role':
                oldValue = this.connection.role.slice();
                this.connection.role = msg.newValue;
                this.connection.localOptions.role = msg.newValue;
                break;
            case 'record':
                oldValue = this.connection.record;
                msg.newValue = msg.newValue === 'true';
                this.connection.record = msg.newValue;
                this.connection.localOptions.record = msg.newValue;
                break;
        }
        this.ee.emitEvent('connectionPropertyChanged', [new ConnectionPropertyChangedEvent_1.ConnectionPropertyChangedEvent(this, this.connection, msg.property, msg.newValue, oldValue)]);
    };
    /**
     * @hidden
     */
    Session.prototype.onNetworkQualityLevelChangedChanged = function (msg) {
        var _this = this;
        if (msg.connectionId === this.connection.connectionId) {
            this.ee.emitEvent('networkQualityLevelChanged', [new NetworkQualityLevelChangedEvent_1.NetworkQualityLevelChangedEvent(this, msg.newValue, msg.oldValue, this.connection)]);
        }
        else {
            this.getConnection(msg.connectionId, 'Connection not found for connectionId ' + msg.connectionId)
                .then(function (connection) {
                _this.ee.emitEvent('networkQualityLevelChanged', [new NetworkQualityLevelChangedEvent_1.NetworkQualityLevelChangedEvent(_this, msg.newValue, msg.oldValue, connection)]);
            })["catch"](function (openViduError) {
                logger.error(openViduError);
            });
        }
    };
    /**
     * @hidden
     */
    Session.prototype.recvIceCandidate = function (msg) {
        var candidate = {
            candidate: msg.candidate,
            component: msg.component,
            foundation: msg.foundation,
            port: msg.port,
            priority: msg.priority,
            protocol: msg.protocol,
            relatedAddress: msg.relatedAddress,
            relatedPort: msg.relatedPort,
            sdpMid: msg.sdpMid,
            sdpMLineIndex: msg.sdpMLineIndex,
            tcpType: msg.tcpType,
            usernameFragment: msg.usernameFragment,
            type: msg.type,
            toJSON: function () {
                return { candidate: msg.candidate };
            }
        };
        this.getConnection(msg.senderConnectionId, 'Connection not found for connectionId ' + msg.senderConnectionId + ' owning endpoint ' + msg.endpointName + '. Ice candidate will be ignored: ' + candidate)
            .then(function (connection) {
            var stream = connection.stream;
            stream.getWebRtcPeer().addIceCandidate(candidate)["catch"](function (error) {
                logger.error('Error adding candidate for ' + stream.streamId
                    + ' stream of endpoint ' + msg.endpointName + ': ' + error);
            });
        })["catch"](function (openViduError) {
            logger.error(openViduError);
        });
    };
    /**
     * @hidden
     */
    Session.prototype.onSessionClosed = function (msg) {
        logger.info('Session closed: ' + JSON.stringify(msg));
        var s = msg.sessionId;
        if (s !== undefined) {
            this.ee.emitEvent('session-closed', [{
                    session: s
                }]);
        }
        else {
            logger.warn('Session undefined on session closed', msg);
        }
    };
    /**
     * @hidden
     */
    Session.prototype.onLostConnection = function (reason) {
        logger.warn('Lost connection in Session ' + this.sessionId);
        if (!!this.sessionId && !!this.connection && !this.connection.disposed) {
            this.leave(true, reason);
        }
    };
    /**
     * @hidden
     */
    Session.prototype.onRecoveredConnection = function () {
        logger.info('Recovered connection in Session ' + this.sessionId);
        this.reconnectBrokenStreams();
        this.ee.emitEvent('reconnected', []);
    };
    /**
     * @hidden
     */
    Session.prototype.onMediaError = function (params) {
        logger.error('Media error: ' + JSON.stringify(params));
        var err = params.error;
        if (err) {
            this.ee.emitEvent('error-media', [{
                    error: err
                }]);
        }
        else {
            logger.warn('Received undefined media error. Params:', params);
        }
    };
    /**
     * @hidden
     */
    Session.prototype.onRecordingStarted = function (response) {
        this.ee.emitEvent('recordingStarted', [new RecordingEvent_1.RecordingEvent(this, 'recordingStarted', response.id, response.name)]);
    };
    /**
     * @hidden
     */
    Session.prototype.onRecordingStopped = function (response) {
        this.ee.emitEvent('recordingStopped', [new RecordingEvent_1.RecordingEvent(this, 'recordingStopped', response.id, response.name, response.reason)]);
    };
    /**
     * @hidden
     * response = {connectionId: string, streamId: string, type: string, data: Object}
     */
    Session.prototype.onFilterEventDispatched = function (response) {
        var _this = this;
        var connectionId = response.connectionId;
        var streamId = response.streamId;
        this.getConnection(connectionId, 'No connection found for connectionId ' + connectionId)
            .then(function (connection) {
            var _a;
            logger.info('Filter event dispatched');
            var stream = connection.stream;
            (_a = stream.filter.handlers.get(response.eventType)) === null || _a === void 0 ? void 0 : _a.call(_this, new FilterEvent_1.FilterEvent(stream.filter, response.eventType, response.data));
        });
    };
    /**
     * @hidden
     */
    Session.prototype.reconnectBrokenStreams = function () {
        logger.info('Re-establishing media connections...');
        var someReconnection = false;
        // Re-establish Publisher stream
        if (!!this.connection.stream && this.connection.stream.streamIceConnectionStateBroken()) {
            logger.warn('Re-establishing Publisher ' + this.connection.stream.streamId);
            this.connection.stream.initWebRtcPeerSend(true);
            someReconnection = true;
        }
        // Re-establish Subscriber streams
        this.remoteConnections.forEach(function (remoteConnection) {
            if (!!remoteConnection.stream && remoteConnection.stream.streamIceConnectionStateBroken()) {
                logger.warn('Re-establishing Subscriber ' + remoteConnection.stream.streamId);
                remoteConnection.stream.initWebRtcPeerReceive(true);
                someReconnection = true;
            }
        });
        if (!someReconnection) {
            logger.info('There were no media streams in need of a reconnection');
        }
    };
    /**
     * @hidden
     */
    Session.prototype.emitEvent = function (type, eventArray) {
        this.ee.emitEvent(type, eventArray);
    };
    /**
     * @hidden
     */
    Session.prototype.leave = function (forced, reason) {
        var _this = this;
        forced = !!forced;
        logger.info('Leaving Session (forced=' + forced + ')');
        this.stopVideoDataIntervals();
        if (!!this.connection) {
            if (!this.connection.disposed && !forced) {
                this.openvidu.sendRequest('leaveRoom', function (error, response) {
                    if (error) {
                        logger.error(error);
                    }
                    _this.openvidu.closeWs();
                });
            }
            else {
                this.openvidu.closeWs();
            }
            this.stopPublisherStream(reason);
            if (!this.connection.disposed) {
                // Make Session object dispatch 'sessionDisconnected' event (if it is not already disposed)
                var sessionDisconnectEvent = new SessionDisconnectedEvent_1.SessionDisconnectedEvent(this, reason);
                this.ee.emitEvent('sessionDisconnected', [sessionDisconnectEvent]);
                sessionDisconnectEvent.callDefaultBehavior();
            }
        }
        else {
            logger.warn('You were not connected to the session ' + this.sessionId);
        }
    };
    /**
     * @hidden
     */
    Session.prototype.initializeParams = function (token) {
        var joinParams = {
            token: (!!token) ? token : '',
            session: this.sessionId,
            platform: !!platform.getDescription() ? platform.getDescription() : 'unknown',
            metadata: !!this.options.metadata ? this.options.metadata : '',
            secret: this.openvidu.getSecret(),
            recorder: this.openvidu.getRecorder()
        };
        return joinParams;
    };
    Session.prototype.sendVideoData = function (streamManager, intervalSeconds, doInterval, maxLoops) {
        var _this = this;
        var _a, _b;
        if (intervalSeconds === void 0) { intervalSeconds = 1; }
        if (doInterval === void 0) { doInterval = false; }
        if (maxLoops === void 0) { maxLoops = 1; }
        if (platform.isChromeBrowser() || platform.isChromeMobileBrowser() || platform.isOperaBrowser() ||
            platform.isOperaMobileBrowser() || platform.isEdgeBrowser() || platform.isElectron() ||
            (platform.isSafariBrowser() && !platform.isIonicIos()) || platform.isAndroidBrowser() ||
            platform.isSamsungBrowser() || platform.isIonicAndroid() || (platform.isIPhoneOrIPad() && platform.isIOSWithSafari())) {
            var obtainAndSendVideo_1 = function () { return __awaiter(_this, void 0, void 0, function () {
                var pc, statsMap, arr_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pc = streamManager.stream.getRTCPeerConnection();
                            if (!(pc.connectionState === 'connected')) return [3 /*break*/, 2];
                            return [4 /*yield*/, pc.getStats()];
                        case 1:
                            statsMap = _a.sent();
                            arr_1 = [];
                            statsMap.forEach(function (stats) {
                                if (("frameWidth" in stats) && ("frameHeight" in stats) && (arr_1.length === 0)) {
                                    arr_1.push(stats);
                                }
                            });
                            if (arr_1.length > 0) {
                                this.openvidu.sendRequest('videoData', {
                                    height: arr_1[0].frameHeight,
                                    width: arr_1[0].frameWidth,
                                    videoActive: streamManager.stream.videoActive != null ? streamManager.stream.videoActive : false,
                                    audioActive: streamManager.stream.audioActive != null ? streamManager.stream.audioActive : false
                                }, function (error, response) {
                                    if (error) {
                                        logger.error("Error sending 'videoData' event", error);
                                    }
                                });
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); };
            if (doInterval) {
                var loops_1 = 1;
                this.videoDataInterval = setInterval(function () {
                    if (loops_1 < maxLoops) {
                        loops_1++;
                        obtainAndSendVideo_1();
                    }
                    else {
                        clearInterval(_this.videoDataInterval);
                    }
                }, intervalSeconds * 1000);
            }
            else {
                this.videoDataTimeout = setTimeout(obtainAndSendVideo_1, intervalSeconds * 1000);
            }
        }
        else if (platform.isFirefoxBrowser() || platform.isFirefoxMobileBrowser() || platform.isIonicIos() || platform.isReactNative()) {
            // Basic version for Firefox and Ionic iOS. They do not support stats
            this.openvidu.sendRequest('videoData', {
                height: ((_a = streamManager.stream.videoDimensions) === null || _a === void 0 ? void 0 : _a.height) || 0,
                width: ((_b = streamManager.stream.videoDimensions) === null || _b === void 0 ? void 0 : _b.width) || 0,
                videoActive: streamManager.stream.videoActive != null ? streamManager.stream.videoActive : false,
                audioActive: streamManager.stream.audioActive != null ? streamManager.stream.audioActive : false
            }, function (error, response) {
                if (error) {
                    logger.error("Error sending 'videoData' event", error);
                }
            });
        }
        else {
            logger.error('Browser ' + platform.getName() + ' (version ' + platform.getVersion() + ') for ' + platform.getFamily() + ' is not supported in OpenVidu for Network Quality');
        }
    };
    /* Private methods */
    Session.prototype.connectAux = function (token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.openvidu.startWs(function (error) {
                if (!!error) {
                    reject(error);
                }
                else {
                    var joinParams = _this.initializeParams(token);
                    _this.openvidu.sendRequest('joinRoom', joinParams, function (error, response) {
                        if (!!error) {
                            reject(error);
                        }
                        else {
                            _this.processJoinRoomResponse(response);
                            // Initialize local Connection object with values returned by openvidu-server
                            _this.connection = new Connection_1.Connection(_this, response);
                            // Initialize remote Connections with value returned by openvidu-server
                            var events_1 = {
                                connections: new Array(),
                                streams: new Array()
                            };
                            var existingParticipants = response.value;
                            existingParticipants.forEach(function (remoteConnectionOptions) {
                                var connection = new Connection_1.Connection(_this, remoteConnectionOptions);
                                _this.remoteConnections.set(connection.connectionId, connection);
                                events_1.connections.push(connection);
                                if (!!connection.stream) {
                                    _this.remoteStreamsCreated.set(connection.stream.streamId, true);
                                    events_1.streams.push(connection.stream);
                                }
                            });
                            // Own 'connectionCreated' event
                            _this.ee.emitEvent('connectionCreated', [new ConnectionEvent_1.ConnectionEvent(false, _this, 'connectionCreated', _this.connection, '')]);
                            // One 'connectionCreated' event for each existing connection in the session
                            events_1.connections.forEach(function (connection) {
                                _this.ee.emitEvent('connectionCreated', [new ConnectionEvent_1.ConnectionEvent(false, _this, 'connectionCreated', connection, '')]);
                            });
                            // One 'streamCreated' event for each active stream in the session
                            events_1.streams.forEach(function (stream) {
                                _this.ee.emitEvent('streamCreated', [new StreamEvent_1.StreamEvent(false, _this, 'streamCreated', stream, '')]);
                            });
                            resolve();
                        }
                    });
                }
            });
        });
    };
    Session.prototype.stopPublisherStream = function (reason) {
        if (!!this.connection.stream) {
            // Dispose Publisher's  local stream
            this.connection.stream.disposeWebRtcPeer();
            if (this.connection.stream.isLocalStreamPublished) {
                // Make Publisher object dispatch 'streamDestroyed' event if the Stream was published
                this.connection.stream.ee.emitEvent('local-stream-destroyed', [reason]);
            }
        }
    };
    Session.prototype.stopVideoDataIntervals = function () {
        clearInterval(this.videoDataInterval);
        clearTimeout(this.videoDataTimeout);
    };
    Session.prototype.stringClientMetadata = function (metadata) {
        if (typeof metadata !== 'string') {
            return JSON.stringify(metadata);
        }
        else {
            return metadata;
        }
    };
    Session.prototype.getConnection = function (connectionId, errorMessage) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var connection = _this.remoteConnections.get(connectionId);
            if (!!connection) {
                // Resolve remote connection
                resolve(connection);
            }
            else {
                if (_this.connection.connectionId === connectionId) {
                    // Resolve local connection
                    resolve(_this.connection);
                }
                else {
                    // Connection not found. Reject with OpenViduError
                    reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, errorMessage));
                }
            }
        });
    };
    Session.prototype.getRemoteConnection = function (connectionId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var connection = _this.remoteConnections.get(connectionId);
            if (!!connection) {
                // Resolve remote connection
                resolve(connection);
            }
            else {
                // Remote connection not found. Reject with OpenViduError
                var errorMessage = 'Remote connection ' + connectionId + " unknown when 'onParticipantLeft'. " +
                    'Existing remote connections: ' + JSON.stringify(_this.remoteConnections.keys());
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, errorMessage));
            }
        });
    };
    Session.prototype.processToken = function (token) {
        var match = token.match(/^(wss?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
        if (!!match) {
            var url = {
                protocol: match[1],
                host: match[2],
                hostname: match[3],
                port: match[4],
                pathname: match[5],
                search: match[6],
                hash: match[7]
            };
            var params = token.split('?');
            var queryParams = decodeURI(params[1])
                .split('&')
                .map(function (param) { return param.split('='); })
                .reduce(function (values, _a) {
                var key = _a[0], value = _a[1];
                values[key] = value;
                return values;
            }, {});
            this.sessionId = queryParams['sessionId'];
            var secret = queryParams['secret'];
            var recorder = queryParams['recorder'];
            var webrtcStatsInterval = queryParams['webrtcStatsInterval'];
            if (!!secret) {
                this.openvidu.secret = secret;
            }
            if (!!recorder) {
                this.openvidu.recorder = true;
            }
            if (!!webrtcStatsInterval) {
                this.openvidu.webrtcStatsInterval = +webrtcStatsInterval;
            }
            this.openvidu.wsUri = 'wss://' + url.host + '/openvidu';
            this.openvidu.httpUri = 'https://' + url.host;
        }
        else {
            logger.error('Token "' + token + '" is not valid');
        }
    };
    Session.prototype.processJoinRoomResponse = function (opts) {
        this.sessionId = opts.session;
        if (opts.coturnIp != null && opts.turnUsername != null && opts.turnCredential != null) {
            var stunUrl = 'stun:' + opts.coturnIp + ':3478';
            var turnUrl1 = 'turn:' + opts.coturnIp + ':3478';
            var turnUrl2 = turnUrl1 + '?transport=tcp';
            this.openvidu.iceServers = [
                { urls: [stunUrl] },
                { urls: [turnUrl1, turnUrl2], username: opts.turnUsername, credential: opts.turnCredential }
            ];
            logger.log("STUN/TURN server IP: " + opts.coturnIp);
            logger.log('TURN temp credentials [' + opts.turnUsername + ':' + opts.turnCredential + ']');
        }
        this.openvidu.role = opts.role;
        this.capabilities = {
            subscribe: true,
            publish: this.openvidu.role !== 'SUBSCRIBER',
            forceUnpublish: this.openvidu.role === 'MODERATOR',
            forceDisconnect: this.openvidu.role === 'MODERATOR'
        };
        logger.info("openvidu-server version: " + opts.version);
        if (opts.version !== this.openvidu.libraryVersion) {
            logger.warn('OpenVidu Server (' + opts.version +
                ') and OpenVidu Browser (' + this.openvidu.libraryVersion +
                ') versions do NOT match. There may be incompatibilities');
        }
    };
    return Session;
}(EventDispatcher_1.EventDispatcher));
exports.Session = Session;
//# sourceMappingURL=Session.js.map