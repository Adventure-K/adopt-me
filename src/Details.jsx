import { useParams } from 'react-router-dom';

const Details = () => {
    const {id} = useParams() // This is getting id out of the hook's returned object with object destructuring, hence the curlies
    return <h1>{id}</h1>
};

export default Details;