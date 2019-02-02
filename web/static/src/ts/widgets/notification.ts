import { Widget } from "../core/widget";
import { Env } from "../env";
import { INotification } from "../core/notifications";

export class Notification extends Widget<Env, INotification> {
  template = "notification";

  close() {
    this.env.notifications.close(this.props.id);
  }
}
