import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getObservationsThunk} from '../store'

const ObservationSearch = ({
  enterObservation,
  keyup,
  handleChange,
  currentList,
  diverObservations,
  removeFromList
}) => {
  return (
    <div>
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
      <h4>Observations selected:</h4>
      <ol>
        {diverObservations.map(obs => (
          <li key={obs.id}>
            {obs.name} <span onClick={() => removeFromList(obs.id)}>X</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ObservationSearch
