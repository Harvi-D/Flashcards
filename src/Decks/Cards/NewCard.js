import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import { CardForm } from "./CardForm";

export function NewCard() {
  //set up hooks
  const { deckId } = useParams();
  //create initial form state
  const initializeForm = {
    front: "",
    back: "",
    deckId,
  };
  const [card, setCard] = useState({ ...initializeForm });
  const [deck, setDeck] = useState({});

  //load cards from API to determine new card ID
  useEffect(() => {
    async function loadDeck() {
      //get name from current deck
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  //update the state as card info changes
  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }
  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    async function updateData() {
      await createCard(deckId, card);
      setCard({ ...initializeForm });
    }
    updateData();
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h4>{deck.name}: Add Card</h4>
      <CardForm
        submitHandler={submitHandler}
        card={card}
        changeFront={changeFront}
        changeBack={changeBack}
      />
    </div>
  );
}