import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getObservationsThunk} from '../store'
import Chip from './styling/chip'
import observationsReducer from '../store/observationsReducer'

const ObservationSearch = ({
  enterObservation,
  keyup,
  handleChange,
  currentList,
  diverObservations,
  removeFromList,
  routeToObservations
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
      <Chip
        arr={diverObservations}
        handleDelete={removeFromList}
        handleClick={routeToObservations}
      />
    </div>
  )
}

export default ObservationSearch
