/* Class component! 

Class components must extend react Component
Class components are not compatible with hooks.
Class components must have a render function. */
import { Component } from 'react';

class Carousel extends Component {
    state = {
        active: 0
    }

    static defaultProps = { // Placeholder to use if nothing is passed in
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
    }

    handleIndexClick = (e) => { // Arrow functions don't create new scope when invoked
        this.setState({                     // The + forces a string into a number
            active: +e.target.dataset.index // This overrides active in the state object above
        })                                  // e.target gets the clicked image from below
    }                                       // dataset refers to any "data-" things on an object
                                            // index is a string because it comes out of the DOM
                                            // EVERYTHING IN THE DOM IS A STRING
    render () {
        const { active } = this.state
        const { images } = this.props

        return (
            <div className="carousel">
                <img src={images[active]} alt="animal hero" />
                <div className="carousel-smaller">
                    {images.map((photo, index) => (
                        // eslint-disable-next-line
                        <img 
                        onClick={this.handleIndexClick}
                        data-index={index}
                        key={photo} 
                        src={photo} 
                        className={index === active ? "active" : ""}
                        alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Carousel;

// If you really need to interface a class component with a hook, 
// make a small functional parent component like so:
// eslint-disable-next-line
function CarouselParent ({ animal }) {
// eslint-disable-next-line
    const [breedList] = useBreedList(animal);

    return <Carousel breedList={breedList} />
}