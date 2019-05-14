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
      <h5>Observations selected:</h5>
      <div className="observation-group">
        <Chip arr={diverObservations} handleDelete={removeFromList} />
      </div>
    </div>
  )
}

export default ObservationSearch
