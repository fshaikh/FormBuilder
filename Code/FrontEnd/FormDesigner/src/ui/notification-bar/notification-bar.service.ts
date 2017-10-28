/**
 * Represents UI Notification Bar. Encapsulates MdSnackBar
 */
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { NotificationMessageBase, TextNotificationMessage, ComponentNotificationMessage } from "ui/notification-bar/NotificationMessage";

@Injectable()
export class NotificationBarService {

  /**
   * Initializes a new instance of NotificationBarService
   * @param _snackBar Snack Bar
   */
  constructor(private _snackBar: MatSnackBar) {
      // Do nothing
  }

  /**
   * Show a text-based Notification Bar
   * @param notificationMessage TextNotificationMessage containing message and action
   */
  public showTextNotificationUI(notificationMessage:TextNotificationMessage):void{
      this._snackBar.open(notificationMessage.Message,notificationMessage.Action,{
      duration: notificationMessage.Duration,
      });
  }

  /**
   * Show a component-based Notification Bar
   * @param notificationMessage ComponentNotificationMessage containing component to be shown in the notification bar
   */
  public showComponentNotificationUI(notificationMessage:ComponentNotificationMessage):void{
      this._snackBar.openFromComponent(notificationMessage.Component,{
        duration: notificationMessage.Duration,
      });
  }

}
