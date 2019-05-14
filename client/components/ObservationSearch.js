import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getObservationsThunk} from '../store'
import Chip from './styling/chip'

const ObservationSearch = ({
  enterObservation,
  keyup,
  handleChange,
  currentList,
  diverObservations,
  removeFromList
}) => {
  return (
    <div className="observation-container">
      <div className="observation-search">
        <label htmlFor="search">Add an observation</label>
        <input
          type="text"
          name="search"
          onKeyUp={keyup}
          onKeyDown={enterObservation}
        />
        <select
          onChange={handleChange}
          name="search-selector"
          id="observation-selector"
        >
          {currentList.map(obs => (
            <option value={JSON.stringify(obs)} name={obs.name} key={obs.id}>
              {obs.name}
            </option>
          ))}
        </select>
      </div>
      <h4>Observations selected:</h4>
      <div className="observation-group">
        {diverObservations.map(obs => (
          <Chip
            key={obs.id}
            handleDelete={() => removeFromList(obs.id)}
            label={obs.name}
            imageUrl={obs.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default ObservationSearch
