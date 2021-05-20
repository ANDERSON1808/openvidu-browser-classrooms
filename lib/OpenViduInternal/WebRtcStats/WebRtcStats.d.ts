import { Stream } from '../../OpenVidu/Stream';
export declare class WebRtcStats {
    private stream;
    private readonly STATS_ITEM_NAME;
    private webRtcStatsEnabled;
    private webRtcStatsIntervalId;
    private statsInterval;
    private POST_URL;
    constructor(stream: Stream);
    isEnabled(): boolean;
    initWebRtcStats(): void;
    getSelectedIceCandidateInfo(): Promise<any>;
    stopWebRtcStats(): void;
    private sendStats;
    private sendStatsToHttpEndpoint;
    private getStats;
    private generateJSONStatsResponse;
    private initWebRtcStatsResponse;
}
