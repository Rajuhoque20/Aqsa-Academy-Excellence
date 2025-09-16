import { callNotification } from "./callNotification";


class NotifictionClass{
    constructor(){

    }
     success(message: string) {
        callNotification("Success!", message);
    }

    error(message: string) {
        callNotification("Error!", message);
    }
}
const Notification=new NotifictionClass()
export default Notification;