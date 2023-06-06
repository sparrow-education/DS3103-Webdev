# DS3103 2022

### Candidate number 1031

---

### The port is set to **7215** and **5171**

---

### Boilerplate used

```bash
npx create-react-app electricgames --template Typescript
npm install axios bootstrap react-router-dom
```

---

# Facts learned from Fullstack using React, .NET C# ASPnet MVC, SQLite & reflections

## ServiceModule 

- When using CRUD functions provided by context like delete will return _data_ as empty string, put will return as number.
- All axios GET calls will return in one form or another. For instance get method by "title" will not return _data_ object itself, but we can retrieve data such as status 200 Ok.
- Get by ID will return data containing the object.
- Get all will also return all data as an array.
---

## Context 

- CRUD functions provided by context will not return anything as they are promise with operations.
- In occasions like editing an object where we have to retrieve one with same id as input, one cannot use getById method provided by context, but rather directly access method from GameServiceModule instead. Reason due to the necessity for mapping the data returned from API call storing the state, thereafter initialize a new object with it's current state.
---

## State management 🧠

- Because of the way states are dispatched in batches I figured out no way with my current knowledge how to restore previous state.
- 1. The return product contains 1 object - the first event that will trigger
setGames will revaluate and games, thus it will overwrite current existing array. But in order for GameList to display in context this becomes problematic.
- 2. How can we restore the previous state with setGames when the user triggers for another action
while games's state currently is either 1 or 0.
- All children are dependent on GameList in order to display in context?🤔🤨
- So the poor man's solution to this a promise provided by context to render if games is 1 or 0 🤷‍♂️
---

## A side note to state managment 👀👆

- It is also worth to keep in mind that whilst we do have the possibility to use provided props from context, we have to differentiate between **"may use"** and **"has the possibility"** to use. I will try refer to an instance, suppose you want to retrieve one element by property, it is more optimal to handle its own state, rather relying on **dependency injection** from parent. A separate axios call via service would be more appropriate. The return data would be then passed as an argument to the setter for this component in order to evaluate or render interchangeably.

## How to react with React
- React will render only when a state is being changed. We can use setters to set the state of a 'thing' and pass by reference to an eventlistener, such as "**onClick**" and "**onChange**". This action will cause React to react, no pun intended, thus we will get a side effect and revaluated state.
### *Pass by reference* - Objects/Arrays/Functions 
```jsx
// GameList is used as a "passive active" component using dependency injection from context.
// We can pass by reference in TSX and return as expression. 
    return (
        <>
            <section className="row" >
                    { getGameItems() }
            </section>
        </>
    );
```
- The user actions are required to be dispatched from an element like button or input field. When clicked or each key stroke that side effect will kick in. 
- 1. *onChange* will take immediate effect commonly inside an input field listening to user input.
- 2. *onClick* will take effect when being clicked on commonly on a button. The button refers to a function by convention using name 'on' + 'handler' to invoke the setter.
```jsx
const onClickHandler = async ( ) => {
        if( userInput.current ) {
            const gameWithId = await GameServiceModule.getGameById( parseInt(userInput.current.value) )
            setChosenGame( gameWithId )
        }
    }
return (
    <input onClick={ onClickHandler } type="button" className='btn btn-primary' value="Search" />
)
```


## The pitfall of using 'row id' and auto increment

- since auto increment will generate id for each record, if we delete any records in between the gap will never be filled.
- If we emptied the database, the ID will still continue it's count from the last record and never 'reset'
- Although this could be fixed with an sql query in sqlite3. [How to reset row id](https://www.designcise.com/web/tutorial/how-to-reset-autoincrement-number-sequence-in-sqlite)
```sql
UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = 'table_name';
```

> in order to use sqlite3 with javascript we can use npm package [sqlite3 with javascript](https://www.sqlitetutorial.net/sqlite-nodejs/connect/)

>**I did manually execute inside dbBrowser for the exam to reset ID issue**
> **I will also address that I set the input limit from 0 - X on purpose, just to visualize on occasions if the last record from the entity has been removed, auto increment will set to previous "position", if you will , hence it will go beyond selection limits, thus the query against database will not be valid, if this was not clear enough.**
```md
Id | Name
1  | Game 1
2  | Game 2 <- delete this
3  | Game 3

Id | Name
1  | Game 1
3  | Game 3 <- then delete this

Id | Name
1  | Game 1
4  | Game 2 <- new added game adapt to last state
```
> Apparently there is a Index sheet inside table called *sqlite_sequence* where you can manually adjust it back to 0.
---

## CSS & Bootstrap

- "App.tsx" is the 'main' container wrapper for main content
- "GameList.tsx" is the 'row
- "GameItems.tsx" is the 'col'
- Headers are outside of the 'main' and has own sticky position
- Footer is just awkward in React. No comments. What is this invincible blob at bottom when zooming the page out to 30% view, the worst of them all.🤬
- Since we render from root element if we don't have enough fillers of one page the footer will act weird and stick to its parent leaving a gap between bottom and window.
---


