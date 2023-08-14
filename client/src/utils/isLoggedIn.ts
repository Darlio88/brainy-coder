//import get token function
import getAccessToken from './getAccessToken';

function IsLoggedIn() {
    const token = getAccessToken();
    if (token) {
        return true;
    }

    return false;
}

export default IsLoggedIn;
