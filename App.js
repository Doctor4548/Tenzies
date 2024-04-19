import React from "react"

import Die from "./component/Die.js"
import {nanoid} from "nanoid"


export default function App(){

    let [die, setDie]=React.useState(allNewDice());


    let [tenzies, setTenzies]=React.useState(false);
    

    React.useEffect(()=>{
        const allDiceHolder= die.every((item)=>{
            return item.isHeld===true;
        })
        
        let pass=true;
        let first=die[0].value;
        die.forEach((item,index,arr)=>{
            if(first!=item.value){
                pass=false;
            }
        })
        if(pass&&allDiceHolder){
            setTenzies((old)=>{
                return !old})
        }

    },[die])

    function reset(){
        setDie(allNewDice());
        setTenzies((old)=>{
            return !old
        })
    }
    
    function allNewDice(){
        let array=[];

        for(let i=0;i<10;i++){
            let object={};
            object.value=Math.ceil(Math.random()*6);
            object.isHeld=false;
            object.id=nanoid()
            array.push(object);
        }

        return array
    }


    function rollDice(){

        setDie((old)=>{
            return old.map((item)=>{
                if(!item.isHeld){
                    return {
                        ...item,
                        value: Math.ceil(Math.random()*6)
                    }
                }
                else{
                    return item;
                }
            })
        })
    }

    function holdDice(id){
        setDie((old)=>{
            return old.map((item)=>{
                return item.id===id? {...item, isHeld: !item.isHeld}: item

            })

        })
    }

    const dieElement=die.map((item)=>{
        return(
            <Die key={item.id} value={item.value} holded={item.isHeld} method={()=>{holdDice(item.id)}}/>
        )
    })


    return(
        <main>
            
            <h1>Tenzies Game</h1>

            <div className="die-container">
                {dieElement}
            </div>
            {tenzies? <button className="roll-die" onClick={reset}>Reset</button>:
                <button className="roll-die" onClick={rollDice}>Roll</button>}

        </main>
    )
}