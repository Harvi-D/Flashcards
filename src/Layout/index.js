import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Decks } from "../Decks";
import { Homepage } from "../Homepage";
import { listDecks } from "../utils/api";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  //define useState for the decks array
  const [decks, setDecks] = useState([]);
  //create a useEffect that gets a list of decks
  useEffect(() => {
    async function loadDecks() {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    }
    loadDecks();
  }, []);

  const addDeck = ( newDeck ) => {
    setDecks( [...decks, newDeck] );
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Homepage decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks">
            <Decks decks={decks} addDeck={addDeck} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
