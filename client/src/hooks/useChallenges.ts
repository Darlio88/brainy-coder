import { useState, useEffect } from 'react';

//api/baseurl
import BaseUrl from '../utils/baseUrl';
import { IChallenge } from '../interfaces/challengeInterface';

function GetAllChallenges(): null | IChallenge[] {
    const [challenges, setChallenges] = useState(null);

    useEffect(() => {
        fetchChallenges();
    }, []);

    async function fetchChallenges() {
        await BaseUrl.get('/challenge').then((res) => {
            console.log(res.data);
            setChallenges(res.data);
        });
    }
    return challenges;
}

export default GetAllChallenges;
