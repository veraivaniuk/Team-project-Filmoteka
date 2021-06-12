import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import { notice, error} from '@pnotify/core';
//import { defaults } from '@pnotify/core';

export function pnotifyError () {
    error ({ title: 'Error', text: 'No couuntry with this name!', styling: 'material', icons: 'material', width: '250px', delay: 3000})
}

export function pnotifyNotice () {
    notice({ title: 'Info', text: 'This movie is added already!', styling: 'material', icons: 'material', width: '250px', delay: 3000})
}