import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastType } from '../types/common';

const customToast = (msg: string, type: ToastType) => {
    // Dismiss any existing notifications before showing a new one
    toast.dismiss();
    switch (type) {
        case 'success':
            toast.success(msg);
            break;
        case 'warning':
            toast.warning(msg);
            break;
        case 'error':
            toast.error(msg);
            break;
        case 'info':
            toast.info(msg);
            break;
        default:
            toast(msg);
    }
};

export const ERRORS = {
    ONGOING_PROCESS: "Sorry, there's an ongoing process in the app. Please wait a moment and try again after the current operation is complete.",
};

export default customToast;
