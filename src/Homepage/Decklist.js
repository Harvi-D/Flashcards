import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export function Decklist({ decks }) {
  const history = useHistory();
  //deck delete handler
  function deleteButtonHandler(deckId) {
    if (
      //if delete is confirmed, remove it from the db
      window.confirm(
        "Really delete? You will not be able to recover this deck."
      )
    ) {
      deleteDeck(deckId).then(history.go(0));
    }
  }
  //use map to create decklist innerHTML from decks data
  const mappedDecks = decks.map((deck, index) => ( 
    <div className="card mb-3 bg-light border-dark" key={index}>
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <h6 className='card-subtitle text-muted mb-2'>{deck.cards.length} cards</h6>
        <p className="card-text">{deck.description}</p>
        <div className="row d-flex bd-highlight">
          <Link to={`/decks/${deck.id}`} className="p-2 bd-highlight ml-3 btn btn-secondary">
          <span className="oi oi-eye"></span> View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="p-2 bd-highlight btn btn-primary ml-3">
          <span className="oi oi-book"></span> Study
          </Link>
          <button
            onClick={() => deleteButtonHandler(deck.id)}
            className="ml-auto p-2 bd-highlight d-flex mr-4 btn btn-danger"
          >
            <span className="oi oi-trash"></span> Delete
          </button>
        </div>
      </div>
    </div>
  ));

  return <div className="d-flex flex-column">{mappedDecks}</div>;
}

