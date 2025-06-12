import BasicCon from "../basic/BasicContainer";

function About() {
  return (
    <BasicCon margin={5} content={
      <>
        <h1>About Page</h1>
        <div>
          <a href="https://github.com/b3rrybunny/dmtools_app" target="_blank" rel="noopener noreferrer">
            GitHub Page
          </a>
        </div>
        <h3>Acknowledgements:</h3>
        <div>
          <a href="https://www.dnd5eapi.co/" target="_blank" rel="noopener noreferrer">
            D&D 5e API
          </a>
        </div>

        <div>
          <a href="https://gist.github.com/tkfu/9819e4ac6d529e225e9fc58b358c3479" target="_blank" rel="noopener noreferrer">
            5e Monster data JSON by tkfu
          </a>
        </div>
        <div>
          <a href="https://www.flaticon.com/free-icons/witch" title="witch icons">Witch icons created by lutfix - Flaticon</a>
        </div>
        <div>
          <a href="https://www.flaticon.com/free-icons/sword" title="sword icons">Sword icons created by Smashicons - Flaticon</a>
        </div>
        <div>
          <a href="https://www.flaticon.com/free-icons/camel" title="camel icons">Camel icons created by Freepik - Flaticon</a>
        </div>
        <div>
          <a href="https://www.flaticon.com/free-icons/wolf" title="wolf icons">Wolf icons created by tulpahn - Flaticon</a>
        </div>
      </>
    } />
  );
}

export default About;