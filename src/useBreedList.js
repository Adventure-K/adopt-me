// Custom Hook!
// First iteration, not actually using this, lol

/*
import { useState, useEffect } from 'react';

const localCache = {};

export default function useBreedList(taco) {            // taco is the props coming over from the SearchParams component, where it is called animal.
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState('unloaded');   // tracking status like this makes the hook much easier to test

    useEffect(() => {
        if (!taco) {
            setBreedList([]);
        } else if (localCache[taco]) {
            setBreedList(localCache[taco])
        } else {
            requestBreedList();
        }

        async function requestBreedList() {         // BIG: If you want to do async/await in an effect, you have to create an async function inside of the effect.
            setBreedList([]);
            setStatus('loading');

            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${taco}`
            )
            const json = await res.json();
            localCache[taco] = json.breeds || []  // The OR operator in a JS expression (to the right of an =) returns the *first truthy value*, or the last value if all are falsy. Empty arrays are truthy.
            setBreedList(localCache[taco]);
            setStatus('loaded');
        }
    }, [taco]);       // useEffect dependency array: Do the useEffect stuff only when there is a change to the animal propsed into this hook.
    return [breedList, status];
}

*/

// With React Query instead

import { useQuery } from '@tanstack/react-query';
import fetchBreedList from './fetchBreedList';

export default function useBreedList(animal) {
    const results = useQuery(["breeds", animal], fetchBreedList);

    return [results?.data?.breeds ?? [], results.status] // Give the results if there, otherwise an empty array
}