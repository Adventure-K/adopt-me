import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchPet from './fetchPet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';


const Details = () => {
    const { id } = useParams()    // This is getting id out of the hook's returned object with object destructuring, hence the curlies.
    // Depends on BrowserRouter over in App
    const results = useQuery(["details", id], fetchPet)

    if (results.isLoading) {   // Cannot use await in a render function. isLoading for the first load, isFetching for refetching
        return (
            <div className="loading-pane">
                <h2 className="loader">💠</h2>
            </div>
        );
    }                           // Can assume after this point that pet has loaded

    const pet = results.data.pets[0];

    return (
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>{pet.animal} - {pet.breed} - {pet.city}, {pet.state}</h2>
                <button>Adopt {pet.name}</button>
                <p>{pet.description}</p>

            </div>
        </div>
    )
};

function DetailsErrorBoundary() {   // IMPORTANT: If the child component (here, Details) accepts props,
    return (                        // This would be a place to pass them through using {...props}.
        <ErrorBoundary>             {/* e.g. <Details {...props} /> */}
            <Details />
        </ErrorBoundary>
    )
}

export default DetailsErrorBoundary;