import {useEffect, useState} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = (props)=>{
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);

  useEffect(()=>{
    const fetchMeals = async()=>{
      setIsLoading(true);
      const res = await fetch('https://burger-builder-eb32e-default-rtdb.firebaseio.com/meals.json',{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      });
      if(!res.ok) {
        throw new Error('something went wrong')
      };
      const resData = await res.json();
      const loadedData = [];
  
      for(const key in resData){
        loadedData.push({
          id:key,
          name:resData[key].name,
          description:resData[key].description,
          price:resData[key].price,
        })
      }
      setMeals(loadedData);
      setIsLoading(false);
    };
    
      fetchMeals().catch(err=>{
        setIsLoading(false);
        setHttpError(err.message);
      });
    
  },[])
    if (isLoading){
      return <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    }
    if(httpError) {
      return <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    }
    const mealList = meals.map(meal => {
        return <MealItem name={meal.name} 
                         description={meal.description}
                         price={meal.price}
                         key={meal.id}
                         id={meal.id}/>
    });

  return (
      <section className={classes.meals}>
          <Card>
            <ul>
                {mealList}
            </ul>
          </Card>
      </section>
  )
};

export default AvailableMeals;