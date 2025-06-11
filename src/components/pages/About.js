import BasicCon from "../basic/BasicContainer";

function About() {
  return (
    <BasicCon margin={5} content={
      <>
        <h1>About Page</h1>
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

      </>
    } />

  );
}

export default About;