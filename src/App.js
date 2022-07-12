import React, { useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
//import './common.scss';

export default function App() {
  const [appState, setAppState] = React.useState({
    value: '',
    items: []
  });




  /*questa calbback è superflua quindi intenzionalmente creata 
  per separare i commenti che ho voluto inserire 
  dalla calback che passiamo al Child
 ****************
  aggiorna lo stato del parent
  e fa handler finale  evento onChange da input 
  */
  const insertInput_updateState = (prevState, e) => {
    // NO e.preventDefault() 
    /**
     * in html di default l input ha uno stato interno  
     * viene inserito nel modulo dati che si il form costruisce 
     * e che sotto l azione del submit invia all action che punta
     * 
     * quindi per l input non ce il comportamento predefinito del submit
     * ci serve solo accedere al valore per poterlo memorizzare nello stato
     */

    return {
      ...prevState,//estraplo le  prop di state quindi attraverso le etichette nell oggetto di stato ho il puntatore
                    //per agire in overriding nella prop interessata

      value: e.target.value//ho il puntatore  value e gli assegno il valore della prop event.target.value 
      //dell oggetto event risale in eventBubbling
    }

  }





  //calback che passiamo al child nella prop changed invocata sull onChange dell input  dentro il form del Child todoInput
  const inputChanged = event => { // *** 2.0 *** 
    setAppState(insertInput_updateState(appState, event))
  };




  /*cambiamo il backgorund al button  delll attivita che riteniamo conclusa */
  const toggleCompleted = index => {

    setAppState((prevState) => {
      return {
        ...prevState,
        /**
         * mi spredo l array per avere disponibili gli elementi di items
         * avendo bisogno di ritornare tutto l array e di cambiare lo stato sull elemento che corrisponde a index
         * utilizo il metodo map sull array di stato 
         * 
         */
        items: [...prevState.items.map((item, idx) => {
          return idx === index ? {               //se uguale  
                          ...item,               //spreddo item
                          completed: true        //posso raggiungere 'completed', assegno valore true a completed
                          } 
                          : 
                          {
                             ...item //altrimenti ritorno item come è
                          }

        })]
        //faccio lo spred di cio che ritorna map perche devo ritonare le prop dell array di stato di partenza
        //che ho aggiornato nel map e non il riferimento al nuovo array aggiornato
      }
    })
  };

  const deleteAll = () => {
    setAppState((prevState) => {
      return {
        ...prevState,
        items: []
      }
    })
  };

  const clearCompleted = () => {

    setAppState((prevState) => {
      return {
        ...prevState,
        items: [...prevState.items.filter(item => item.completed === false)]
      }
    })
  };


  /** *** 2.1 ***
   * il child todoInput riceve la callBack addToTodo passata come gestore di evento dell onSubmit
   */
  const addToTodo = e => {

    e.preventDefault()/**funge da return false dell html
                        come se avessimo il codice che segue

                        <form onsubmit="console.log('Hai cliccato Invia.'); return false">
                            <button type="submit">Invia</button>
                        </form>

                        perche il modulo del form viene gestito internamente al compoente
                        
                        */

    setAppState((prevState) => {
      /**aggiorniamo direttamente qui senza alcuna callBack come r 18 */
      return {
        ...prevState,
        items: [...prevState.items, {
          id: e.timeStamp,      //nell oggetto event abbiamo la prop timeStamp che utilizziamo come id univoco
          title: appState.value,
          completed: false
        }
        ]
      }
    })

  };

  return (
    <div className='App'>
      <TodoInput
        submitted={addToTodo}
        changed={inputChanged}
        value={appState.value}
      />

      {/*
      * *** 3 *** 
       * anche il child todoList dipende dallo stato 
       * nel renderizzarsi
       *  nella prop  items che riceve la prop items di appState
       * nelle prop che ricevono le callback come handler
      */}
      {appState.items.length > 0 && (
        <TodoList
          items={appState.items}
          clearClicked={clearCompleted}
          todoClicked={toggleCompleted}
          deleteClicked={deleteAll}
        />
      )}
    </div>
  );
}
