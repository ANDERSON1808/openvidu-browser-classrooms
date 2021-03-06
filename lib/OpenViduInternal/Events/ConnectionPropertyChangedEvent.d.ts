import { Connection } from '../../OpenVidu/Connection';
import { Session } from '../../OpenVidu/Session';
import { Event } from './Event';
/**
 * **This feature is part of OpenVidu Pro tier** <a href="https://docs.openvidu.io/en/stable/openvidu-pro/" target="_blank" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-right: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif">PRO</a>
 *
 * Defines event `connectionPropertyChanged` dispatched by [[Session]] object.
 * This event is fired when any property of the local [[Connection]] object changes.
 * The properties that may change are [[Connection.role]] and [[Connection.record]].
 *
 * The only way the Connection properties may change is by updating them through:
 *
 * - [API REST](/en/stable/reference-docs/REST-API/#patch-openviduapisessionsltsession_idgtconnectionltconnection_idgt)
 * - [openvidu-java-client](/en/stable/reference-docs/openvidu-java-client/#update-a-connection)
 * - [openvidu-node-client](/en/stable/reference-docs/openvidu-node-client/#update-a-connection)<br><br>
 */
export declare class ConnectionPropertyChangedEvent extends Event {
    /**
     * The Connection whose property has changed
     */
    connection: Connection;
    /**
     * The property of the stream that changed. This value is either `"role"` or `"record"`
     */
    changedProperty: string;
    /**
     * New value of the property (after change, current value)
     */
    newValue: Object;
    /**
     * Previous value of the property (before change)
     */
    oldValue: Object;
    /**
     * @hidden
     */
    constructor(target: Session, connection: Connection, changedProperty: string, newValue: Object, oldValue: Object);
    /**
     * @hidden
     */
    callDefaultBehavior(): void;
}
