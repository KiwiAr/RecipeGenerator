import Image from 'next/image';
import styles from './../styles/recipe_generator.module.css';

export default function generator() {

    // Get the user input
    function getInput() {
        const input = document.getElementById("first").value;
        document.getElementById("first").value = "";
        return input;
    }

    // Call api when submit button clicked
    async function onSubmit(event) {
        event.preventDefault();
        
        try {
          const input = getInput();
          const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: input }),
          });
    
          const data = await response.json();
          // simply print out the result in the console
          console.log(data.result);
          
          if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
          }

        } catch(error) {
          console.error(error);
          alert(error.message);
        }
    }


    return (
        <main className={styles.main}>
        <div className={styles.heading}>
          <Image src = "/KiwiLogo.png" width={100} height={50} alt = 'kiwilogo'/>
          <h1>KiwiAr</h1>
        </div>
        <div>
          <h2 className={styles.recipeheading}>Welcome to the recipe generator!</h2>
        </div>
        <div>
        <form action="/send-data-here" method="post">
          <label className={styles.input}>Input:</label>
          <input type="text" id="first" name="first" className = {styles.inputBox} 
          placeholder = "Type here or select the suggested categories below..."/>
          <button type="submit" className={styles.submitButton} onClick={onSubmit}>Submit</button>
        </form>
          </div>
          <div className = {styles.input}>
          <h3>Suggested:</h3>
          <button className = {styles.submitButton}>Party</button>
          <button className = {styles.submitButton}>Meal-Prep</button>
          <button className = {styles.submitButton}>Family Cooking</button>
          </div>
          <div>
          <h3>Recommended Items:</h3>
          </div>
          <div>
          <p>Click on each item to find <br/>
          out more</p>
        </div>
        <div>
          <h3>Recipe: </h3>
          <button className = {styles.submitButton}>Buy on Shopee now!</button>
        </div>
        <div>
          <form action="/send-data-here" method="post">
          <label className={styles.input}>Not what you like? <br/> Enter tweaks here:</label>
          <input type="text" id="first" name="first" className = {styles.inputBox} 
          placeholder = "Type here or select the suggested categories below..."/>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
        </div>
      </main>
    );
};