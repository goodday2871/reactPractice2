import React from 'react'
import classes from './MealSummary.module.css'
const mealSummary = ()=>{
  return (<section className={classes.summary}>
    <h2>有好多好多早餐在這裡</h2>
    <p>在你熟悉的商店裡</p>
    <p>不管你睡得多晚起的多晚，早安晨之美永遠歡迎你</p>
  </section>
  );
};

export default mealSummary;