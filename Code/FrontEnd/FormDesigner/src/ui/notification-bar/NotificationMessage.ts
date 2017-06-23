/**
 * This class represents base class for notification message
 */
export abstract class NotificationMessageBase{
    public Duration:number;
}

/**
 * This class represents text-based notification message
 */
export class TextNotificationMessage extends NotificationMessageBase{
     public Message:string;
    public Action:string;
}

/**
 * This class represents component-based notification message
 */
export class ComponentNotificationMessage extends NotificationMessageBase{
    public Component:any;
}