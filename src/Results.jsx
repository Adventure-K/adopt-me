import Pet from './Pet';

const Results = ({ pets }) => { // Destructure the props to get pets
    return (
        <div className='search'>
            {!pets.length ? (
                <h1>No Pets Found</h1>
            ) : (
                pets.map(pet => (
                    <Pet 
                    animal = {pet.animal}
                    id = {pet.id}
                    name = {pet.name}
                    breed = {pet.breed}
                    images = {pet.images}
                    location = {`${pet.city}, ${pet.state}`} // Template string here solely for the comma between city and state
                    key = {pet.id}
                    />
                ))
            )}
        </div>
    );
};

export default Results;