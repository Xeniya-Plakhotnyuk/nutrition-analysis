import './App.css';
import { useEffect, useState } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";


function App(){


  const MY_ID = "12cf835f"
  const MY_KEY = "5d1f0b63f5848208f0fa94943ee68311"
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])


  return (
    <div>
      {stateLoader && <LoaderPage />}

      <h1>Nutrition Analysis</h1>
      <form onSubmit={finalSearch}>
        <input
          placeholder="Search..."
          onChange={myRecipeSearch}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit, element}) =>
              <Nutrition
                key={element}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  );
}



export default App;
