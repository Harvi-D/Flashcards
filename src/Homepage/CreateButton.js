import React from 'react';
import { useHistory } from 'react-router-dom';

export function CreateButton() {
    const history = useHistory();

    return (
        <button 
            className='btn btn-info mb-3 font-weight-bold'
            type='button'
            onClick={() => history.push('/decks/new')}
        >
            <span class="oi oi-plus"></span>  Create Deck
        </button>
    )
}

