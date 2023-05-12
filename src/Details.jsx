import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import fetchPet from './fetchPet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';

const Details = () => {
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate(); // Lets you move the user around programmatically
    
    // eslint-disable-next-line no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
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
                <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                <p>{pet.description}</p>
                {showModal ? (
                        <Modal> {/* Doesn't really matter where this is in the render function */}
                            <div>
                                <h1>Would you like to adopt {pet.name}?</h1>
                                <div className="buttons">
                                    <button onClick={() => {
                                        setAdoptedPet(pet);
                                        navigate("/");
                                    }}>
                                        Yes</button>
                                    <button onClick={() => setShowModal(false)}>No</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null}
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