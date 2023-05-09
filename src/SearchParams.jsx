import { useState } from 'react';        // useState and useEffect: these are hooks. By convention all hooks start with "use"
import { useQuery } from '@tanstack/react-query';
import Results from './Results.jsx'
import useBreedList from './useBreedList.js';
import fetchSearch from './fetchSearch.js';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']; // This is the only part of the form that is defined locally so it still has to be controlled

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: '', 
        animal: '', 
        breed: '', 
    }) 
    const [animal, setAnimal] = useState('');   // This is a STATE VARIABLE. Its value is easily updated on the fly by something in the component. 
    const [breeds] = useBreedList(animal);      // animal is a prop here. We're passing it to the custom hook when the hook is invoked (when animal changes?). 
                                                // ARRAY DESTRUCTURING. I THINK breeds is declared as an array above because that causes it to only take the first element from the hook's return (output) array. 
    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];
    // useEffect(() => {                        // This hook is used to make things happen outside the component. Usually API calls, but not always
    // requestPets();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);                                  // The useEffect dependency array: if specified empty, it will only run once. If not specified, it will run with *every* re-render

                                                // async functions are needed when the function involves API calls, interacts with a database, or waits for user input
                                                // The awaits are used to pause the function on that line until the promise is resolved
    // async function requestPets() {              // The function called by the above useEffect: an API call to retrieve an object stored elsewhere to be used in this component
    //     const res = await fetch(                // BIG: fetch(file location)
    //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`     // This is a template string: a string in which you can embed JS expressions using ${}. 
    //     );                                                                                          // Template strings must be enclosed by backticks
    //     const json = await res.json();          // Take what comes back from API call and save it to variable "json"

    //     setPets(json.pets);                     // Set pets to contents of "pets" key from the JSON object
    // }

    // useEffect(() => {                        
    //     console.log(location)                // BIG: Don't do side effects (e.g. console.log) inside the render function. They don't display right and it makes the function slower.
    // }, [location]);                          // DEPENDENCY ARRAY: Specifying [location] as the second argument here tells React to do this useEffect whenever location changes
                                                // Don't make hooks conditional on anything. Each re-render must call all the same hooks, in the same order, every time.

    return (                                    // Parentheses here allow the return statement to use multiple lines
        <div className="search-params">         {/* "class" is a reserved term in javascript, so JSX diverges here slightly from HTML and uses "className" */}
            <form onSubmit={e => {              {/* This is an example of a controlled form. It's a good way of illustrating state. It's not best practice. Will learn uncontrolled later */}
                e.preventDefault();
                // requestPets();
                const formData = new FormData(e.target); // Browser API, not React. Send it a form and it pulls out the data for you.
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? ""
                };
                setRequestParams(obj);
            }}>
                <label htmlFor="location">      {/* As above, "for" is reserved. "htmlFor" */}
                    Location
                    <input id="location" 
                    name="location"
                    // value = {location}       // Making form uncontrolled now and using React Query
                    // onChange={(e) => setLocation(e.target.value)}
                    placeholder="location" />           
                    {/* Curly braces inside JSX designate a JavaScript expression (an expression is anything that can be on the right side of an equals sign) */}
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                        }}>
                            <option />          {/* Default, blank option at top of dropdown to display when component loads */}
                            {ANIMALS.map((animal) => ( // paren: implicit return
                                <option key={animal}>{animal}</option>
                            ))}
                        </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        disabled={breeds.length === 0}
                        name="breed"
                        // value={breed}        // Making uncontrolled, don't need this
                        // onChange={(e) => {
                        //     setBreed(e.target.value);
                        // }}
                        >
                            <option /> 
                            {breeds.map((breed) => ( 
                                <option key={breed}>{breed}</option>
                            ))}
                        </select>
                </label>
                <button type="submit">Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;