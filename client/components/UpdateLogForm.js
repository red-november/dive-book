/* eslint-disable no-lone-blocks */
import React from 'react'
import {ObservationSearch} from './index'

const UpdateForm = props => {
  const {
    handleChange,
    handleSubmit,
    allShops,
    singleShop,
    enterObservation,
    keyup,

    removeFromList
  } = props
  let {
    date,
    diveshopId,
    diveName,
    timeIn,
    timeOut,
    location,
    maxDepth,
    tankPressureStart,
    tankPressureEnd,
    tankType,
    beltWeight,
    wetSuitType,
    wetSuitThickness,
    airMixture,
    description,
    visibility,
    hasStrongCurrent,
    displayText,
    currentList,
    diverObservations
  } = props.log

  if (date) {
    date = date.split('T')[0]
  }

  let tankTypeOptions = ['Aluminum', 'Steel', 'Other']
  let wetSuitTypeOptions = ['Shortie', 'Fulljohn', 'Dry Suit', 'None', 'Other']
  let airMixtureOptions = ['Air', 'Nitrox', 'Hydreliox']

  return (
    <div className="page-container">
      <form>
        <table>
          <tbody>
            <tr>
              <th>Description</th>
              <th>Value</th>
            </tr>

            <tr>
              <td>
                {' '}
                <label htmlFor="diveshopId">Dive Shop:</label>
              </td>
              <td>
                <select name="diveshopId" onChange={handleChange}>
                  {allShops.map(
                    shop =>
                      shop.id === diveshopId ? (
                        <option key={shop.id} value={shop.id} selected>
                          {shop.name}
                        </option>
                      ) : (
                        <option key={shop.id} value={shop.id}>
                          {shop.name}
                        </option>
                      )
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="diveName">Dive Name:</label>
              </td>
              <td>
                {singleShop.offeredDives && !displayText ? (
                  <select name="diveName" onChange={handleChange}>
                    <option value="Other">Select dive</option>
                    {singleShop.offeredDives.map(
                      dive =>
                        dive.name === diveName ? (
                          <option
                            key={dive.id}
                            value={`${dive.name}^${dive.id}`}
                            selected
                          >
                            {dive.name}
                          </option>
                        ) : (
                          <option
                            key={dive.id}
                            value={`${dive.name}^${dive.id}`}
                          >
                            {dive.name}
                          </option>
                        )
                    )}
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="diveName"
                    value={diveName}
                    onChange={handleChange}
                    placeholder="Enter dive here..."
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="date">Date:</label>{' '}
              </td>
              <td>
                {' '}
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="timeIn">Time In:</label>
              </td>
              <td>
                {' '}
                <input
                  type="time"
                  name="timeIn"
                  value={timeIn}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="timeOut">Time Out:</label>
              </td>
              <td>
                {' '}
                <input
                  type="time"
                  name="timeOut"
                  value={timeOut}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="location">Location:</label>
              </td>
              <td>
                {' '}
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={handleChange}
                  placeholder="Enter location here..."
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="maxDepth">Max Depth:</label>{' '}
              </td>
              <td>
                {' '}
                <input
                  type="number"
                  name="maxDepth"
                  value={maxDepth}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="tankPressureStart">
                  Tank Pressure Start:
                </label>{' '}
              </td>
              <td>
                {' '}
                <input
                  type="number"
                  name="tankPressureStart"
                  value={tankPressureStart}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="tankPressureEnd">Tank Pressure End:</label>
              </td>
              <td>
                {' '}
                <input
                  type="number"
                  name="tankPressureEnd"
                  value={tankPressureEnd}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="tankType">Tank Type:</label>
              </td>
              <td>
                {' '}
                <select
                  name="tankType"
                  onChange={handleChange}
                  value={tankType}
                >
                  {tankTypeOptions.map(
                    type =>
                      type === tankType ? (
                        <option value={type} selected>
                          {type}
                        </option>
                      ) : (
                        <option value={type}>{type}</option>
                      )
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="beltWeight">Belt Weight:</label>
              </td>
              <td>
                {' '}
                <input
                  type="number"
                  name="beltWeight"
                  value={beltWeight}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="wetSuitType">Wet Suit Type:</label>
              </td>
              <td>
                {' '}
                <select
                  name="wetSuitType"
                  onChange={handleChange}
                  value={wetSuitType}
                >
                  {wetSuitTypeOptions.map(
                    suit =>
                      suit === wetSuitType ? (
                        <option key={suit} value={suit} selected>
                          {suit}
                        </option>
                      ) : (
                        <option key={suit} value={suit}>
                          {suit}
                        </option>
                      )
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="wetSuitThickness">Wet Suit Thickness:</label>
              </td>
              <td>
                {' '}
                <input
                  type="number"
                  name="wetSuitThickness"
                  value={wetSuitThickness}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="airMixture">Air Mixture:</label>
              </td>
              <td>
                {' '}
                <select
                  name="airMixture"
                  onChange={handleChange}
                  value={airMixture}
                >
                  {airMixtureOptions.map(
                    mix =>
                      mix === airMixture ? (
                        <option key={mix} value={mix} selected>
                          {mix}
                        </option>
                      ) : (
                        <option key={mix} value={mix}>
                          {mix}
                        </option>
                      )
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="visibility">Visibility:</label>
              </td>
              <td>
                {' '}
                <input
                  type="number"
                  name="visibility"
                  value={visibility}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="hasStrongCurrent">Strong Current?</label>
              </td>
              <td>
                {' '}
                <select
                  name="hasStrongCurrent"
                  onChange={handleChange}
                  value={hasStrongCurrent}
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="description">Description:</label>
              </td>
              <td>
                {' '}
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  placeholder="Enter description here..."
                />{' '}
              </td>
            </tr>
          </tbody>
        </table>
        <ObservationSearch
          enterObservation={enterObservation}
          keyup={keyup}
          handleChange={handleChange}
          currentList={currentList}
          diverObservations={diverObservations}
          removeFromList={removeFromList}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default UpdateForm
