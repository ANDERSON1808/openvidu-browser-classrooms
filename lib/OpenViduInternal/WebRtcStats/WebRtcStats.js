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
exports.WebRtcStats = void 0;
var OpenViduLogger_1 = require("../Logger/OpenViduLogger");
var Platform_1 = require("../Utils/Platform");
/**
 * @hidden
 */
var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
/**
 * @hidden
 */
var platform;
;
var WebRtcStats = /** @class */ (function () {
    function WebRtcStats(stream) {
        this.stream = stream;
        this.STATS_ITEM_NAME = 'webrtc-stats-config';
        this.webRtcStatsEnabled = false;
        this.statsInterval = 1;
        platform = Platform_1.PlatformUtils.getInstance();
    }
    WebRtcStats.prototype.isEnabled = function () {
        return this.webRtcStatsEnabled;
    };
    WebRtcStats.prototype.initWebRtcStats = function () {
        var _this = this;
        var webrtcObj = localStorage.getItem(this.STATS_ITEM_NAME);
        if (!!webrtcObj) {
            this.webRtcStatsEnabled = true;
            var webrtcStatsConfig = JSON.parse(webrtcObj);
            // webrtc object found in local storage
            logger.warn('WebRtc stats enabled for stream ' + this.stream.streamId + ' of connection ' + this.stream.connection.connectionId);
            logger.warn('localStorage item: ' + JSON.stringify(webrtcStatsConfig));
            this.POST_URL = webrtcStatsConfig.httpEndpoint;
            this.statsInterval = webrtcStatsConfig.interval; // Interval in seconds
            this.webRtcStatsIntervalId = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendStatsToHttpEndpoint()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, this.statsInterval * 1000);
        }
        else {
            logger.debug('WebRtc stats not enabled');
        }
    };
    // Used in test-app
    WebRtcStats.prototype.getSelectedIceCandidateInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getStats().then(function (stats) {
                if (platform.isChromeBrowser() || platform.isChromeMobileBrowser() || platform.isOperaBrowser() || platform.isOperaMobileBrowser()) {
                    var localCandidateId = void 0, remoteCandidateId = void 0, googCandidatePair = void 0;
                    var localCandidates = {};
                    var remoteCandidates = {};
                    for (var key in stats) {
                        var stat = stats[key];
                        if (stat.type === 'localcandidate') {
                            localCandidates[stat.id] = stat;
                        }
                        else if (stat.type === 'remotecandidate') {
                            remoteCandidates[stat.id] = stat;
                        }
                        else if (stat.type === 'googCandidatePair' && (stat.googActiveConnection === 'true')) {
                            googCandidatePair = stat;
                            localCandidateId = stat.localCandidateId;
                            remoteCandidateId = stat.remoteCandidateId;
                        }
                    }
                    var finalLocalCandidate_1 = localCandidates[localCandidateId];
                    if (!!finalLocalCandidate_1) {
                        var candList = _this.stream.getLocalIceCandidateList();
                        var cand = candList.filter(function (c) {
                            return (!!c.candidate &&
                                c.candidate.indexOf(finalLocalCandidate_1.ipAddress) >= 0 &&
                                c.candidate.indexOf(finalLocalCandidate_1.portNumber) >= 0 &&
                                c.candidate.indexOf(finalLocalCandidate_1.priority) >= 0);
                        });
                        finalLocalCandidate_1.raw = !!cand[0] ? cand[0].candidate : 'ERROR: Cannot find local candidate in list of sent ICE candidates';
                    }
                    else {
                        finalLocalCandidate_1 = 'ERROR: No active local ICE candidate. Probably ICE-TCP is being used';
                    }
                    var finalRemoteCandidate_1 = remoteCandidates[remoteCandidateId];
                    if (!!finalRemoteCandidate_1) {
                        var candList = _this.stream.getRemoteIceCandidateList();
                        var cand = candList.filter(function (c) {
                            return (!!c.candidate &&
                                c.candidate.indexOf(finalRemoteCandidate_1.ipAddress) >= 0 &&
                                c.candidate.indexOf(finalRemoteCandidate_1.portNumber) >= 0 &&
                                c.candidate.indexOf(finalRemoteCandidate_1.priority) >= 0);
                        });
                        finalRemoteCandidate_1.raw = !!cand[0] ? cand[0].candidate : 'ERROR: Cannot find remote candidate in list of received ICE candidates';
                    }
                    else {
                        finalRemoteCandidate_1 = 'ERROR: No active remote ICE candidate. Probably ICE-TCP is being used';
                    }
                    resolve({
                        googCandidatePair: googCandidatePair,
                        localCandidate: finalLocalCandidate_1,
                        remoteCandidate: finalRemoteCandidate_1
                    });
                }
                else {
                    reject('Selected ICE candidate info only available for Chrome');
                }
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    WebRtcStats.prototype.stopWebRtcStats = function () {
        if (this.webRtcStatsEnabled) {
            clearInterval(this.webRtcStatsIntervalId);
            logger.warn('WebRtc stats stopped for disposed stream ' + this.stream.streamId + ' of connection ' + this.stream.connection.connectionId);
        }
    };
    WebRtcStats.prototype.sendStats = function (url, response) {
        return __awaiter(this, void 0, void 0, function () {
            var configuration, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        configuration = {
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(response),
                            method: 'POST'
                        };
                        return [4 /*yield*/, fetch(url, configuration)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        logger.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WebRtcStats.prototype.sendStatsToHttpEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var webrtcStats, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getStats()];
                    case 1:
                        webrtcStats = _a.sent();
                        response = this.generateJSONStatsResponse(webrtcStats);
                        return [4 /*yield*/, this.sendStats(this.POST_URL, response)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        logger.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WebRtcStats.prototype.getStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var pc, statsReport, response_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(platform.isChromeBrowser() || platform.isChromeMobileBrowser() || platform.isOperaBrowser() || platform.isOperaMobileBrowser())) return [3 /*break*/, 1];
                                    pc = this.stream.getRTCPeerConnection();
                                    pc.getStats(function (statsReport) {
                                        var stats = statsReport.result().filter(function (stat) { return stat.type === 'ssrc'; });
                                        var response = _this.initWebRtcStatsResponse();
                                        stats.forEach(function (stat) {
                                            var valueNames = stat.names();
                                            var mediaType = stat.stat("mediaType");
                                            var isAudio = mediaType === 'audio' && valueNames.includes('audioOutputLevel');
                                            var isVideo = mediaType === 'video' && valueNames.includes('qpSum');
                                            var isIndoundRtp = valueNames.includes('bytesReceived') && (isAudio || isVideo);
                                            var isOutboundRtp = valueNames.includes('bytesSent');
                                            if (isIndoundRtp) {
                                                response.inbound[mediaType].bytesReceived = Number(stat.stat('bytesReceived'));
                                                response.inbound[mediaType].packetsReceived = Number(stat.stat('packetsReceived'));
                                                response.inbound[mediaType].packetsLost = Number(stat.stat('packetsLost'));
                                                if (mediaType === 'video') {
                                                    response.inbound['video'].framesDecoded = Number(stat.stat('framesDecoded'));
                                                    response.inbound['video'].nackCount = Number(stat.stat('nackCount'));
                                                }
                                            }
                                            else if (isOutboundRtp) {
                                                response.outbound[mediaType].bytesSent = Number(stat.stat('bytesSent'));
                                                response.outbound[mediaType].packetsSent = Number(stat.stat('packetsSent'));
                                                if (mediaType === 'video') {
                                                    response.outbound['video'].framesEncoded = Number(stat.stat('framesEncoded'));
                                                    response.outbound['video'].nackCount = Number(stat.stat('nackCount'));
                                                }
                                            }
                                        });
                                        resolve(response);
                                    });
                                    return [3 /*break*/, 3];
                                case 1: return [4 /*yield*/, this.stream.getRTCPeerConnection().getStats(null)];
                                case 2:
                                    statsReport = _a.sent();
                                    response_1 = this.initWebRtcStatsResponse();
                                    statsReport.forEach(function (stat) {
                                        var mediaType = stat.mediaType;
                                        // isRemote property has been deprecated from Firefox 66 https://blog.mozilla.org/webrtc/getstats-isremote-66/
                                        switch (stat.type) {
                                            case "outbound-rtp":
                                                response_1.outbound[mediaType].bytesSent = Number(stat.bytesSent);
                                                response_1.outbound[mediaType].packetsSent = Number(stat.packetsSent);
                                                if (mediaType === 'video') {
                                                    response_1.outbound[mediaType].framesEncoded = Number(stat.framesEncoded);
                                                }
                                                break;
                                            case "inbound-rtp":
                                                response_1.inbound[mediaType].bytesReceived = Number(stat.bytesReceived);
                                                response_1.inbound[mediaType].packetsReceived = Number(stat.packetsReceived);
                                                response_1.inbound[mediaType].packetsLost = Number(stat.packetsLost);
                                                if (mediaType === 'video') {
                                                    response_1.inbound[mediaType].framesDecoded = Number(stat.framesDecoded);
                                                    response_1.inbound[mediaType].nackCount = Number(stat.nackCount);
                                                }
                                                break;
                                        }
                                    });
                                    return [2 /*return*/, resolve(response_1)];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    WebRtcStats.prototype.generateJSONStatsResponse = function (stats) {
        return {
            '@timestamp': new Date().toISOString(),
            participant_id: this.stream.connection.data,
            session_id: this.stream.session.sessionId,
            platform: platform.getName(),
            platform_description: platform.getDescription(),
            stream: 'webRTC',
            webrtc_stats: stats
        };
    };
    WebRtcStats.prototype.initWebRtcStatsResponse = function () {
        return {
            inbound: {
                audio: {},
                video: {}
            },
            outbound: {
                audio: {},
                video: {}
            }
        };
    };
    return WebRtcStats;
}());
exports.WebRtcStats = WebRtcStats;
//# sourceMappingURL=WebRtcStats.js.map