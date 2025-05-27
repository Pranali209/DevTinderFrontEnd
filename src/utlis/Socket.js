import io from 'socket.io-client';
import { Base_Url } from './Contant';

export const CreateSocketConnection = ()=>{

    return io(
        Base_Url,
        
    );
}
