// "When I go back to the browser, what am I expecting to see?"
const Pet = (props) => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, props.name),
        React.createElement("h2", {}, props.animal),
        React.createElement("h2", {}, props.type),
    ]);
};
 // One-way data flow (props) - Vastly simplifies debugging and makes data flow much more explicit
 // Since child now expects props, add arguments to createElement commands in parent
const App = () => {
    return React.createElement(
        "div",
        {},
        [
        React.createElement("h1", {}, "Adopt Me!"),
        React.createElement(Pet, {
            animal: 'Cat',
            name: 'Kida',
            type: 'Siamese'
        }),
        React.createElement(Pet, {
            animal: 'Cat',
            name: 'Jojo',
            type: 'Black'
        }),
        React.createElement(Pet, {
            animal: 'Cat',
            name: 'Zeus',
            type: 'Fluffer'
        }),
        ]
    )
};


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App)); 