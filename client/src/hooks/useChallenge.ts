import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
//baseurl
import baseUrl from '../utils/baseUrl';

//import challenge interface
import { IChallenge } from '../interfaces/challengeInterface';

interface IData extends IChallenge {
    data: IChallenge;
}

function GetChallenge(id: string): IChallenge {
    const [getUser, setGetUser] = useState<null | IChallenge>(null);

    useEffect(() => {
        challengeFetcher();
    }, []);

    async function challengeFetcher() {
        await baseUrl
            .get('/challenge/' + id, {})
            .then((res: AxiosResponse<IData>) => {
                const data: IChallenge = res.data;
                setGetUser(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return getUser;
}

export default GetChallenge;
