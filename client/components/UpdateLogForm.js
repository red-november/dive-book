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
    currentList,
    diverObservations,
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
    offeredDiveId
  } = props.log

  if (date) {
    date = date.split('T')[0]
  }

  let tankTypeOptions = ['Aluminum', 'Steel', 'Other']
  let wetSuitTypeOptions = ['Shortie', 'Fulljohn', 'Dry Suit', 'None', 'Other']
  let airMixtureOptions = ['Air', 'Nitrox', 'Hydreliox']

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Description</th>
              <th>Value</th>
            </tr>

            <tr>
              {/* <td><a href={`/allshops/${}`}></a> </td> */}
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
              <td>Time Out:</td>
              <td>{timeOut}</td>
            </tr>
            <tr>
              <td>Location: </td>
              <td>{location}</td>
            </tr>
            <tr>
              <td>Max Depth: </td>
              <td>{maxDepth}</td>
            </tr>
            <tr>
              <td>Tank Pressure Start: </td>
              <td>{tankPressureStart}</td>
            </tr>
            <tr>
              <td>Tank Pressure End: </td>
              <td>{tankPressureEnd}</td>
            </tr>
            <tr>
              <td>Tank Type</td>
              <td>{tankType}</td>
            </tr>
            <tr>
              <td>Belt Weight:</td>
              <td>{beltWeight}</td>
            </tr>
            <tr>
              <td>Wet Suit Type: </td>
              <td>{wetSuitType}</td>
            </tr>
            <tr>
              <td>Wet Suit Thickness</td>
              <td>{wetSuitThickness}</td>
            </tr>
            <tr>
              <td>Air Mixture: </td>
              <td>{airMixture}</td>
            </tr>
            <tr>
              <td>Visibility: </td>
              <td>{visibility}</td>
            </tr>
            <tr>
              <td>Strong Current:</td>
              {hasStrongCurrent ? <td>Yes</td> : <td>No</td>}
            </tr>
            <tr>
              <td>Description: </td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>Stamp:</td>
              {/* <td>
                {isVerified ? (
                  <img className="Stamp" src={singleShop.stampImgUrl} />
                ) : (
                  'Not Verified'
                )}
              </td> */}
            </tr>
          </tbody>
        </table>
        <label htmlFor="diveshopId">Dive Shop:</label>
        <select name="diveshopId" onChange={handleChange}>
          {/* <option value="">Select dive shop</option> */}
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
        <label htmlFor="diveName">Dive Name:</label>
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
                  <option key={dive.id} value={`${dive.name}^${dive.id}`}>
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

        <label htmlFor="date">Date:</label>
        <input type="date" name="date" value={date} onChange={handleChange} />

        <label htmlFor="timeIn">Time In:</label>
        <input
          type="time"
          name="timeIn"
          value={timeIn}
          onChange={handleChange}
        />
        <label htmlFor="timeOut">Time Out:</label>
        <input
          type="time"
          name="timeOut"
          value={timeOut}
          onChange={handleChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="Enter location here..."
        />
        <label htmlFor="maxDepth">Max Depth:</label>
        <input
          type="number"
          name="maxDepth"
          value={maxDepth}
          onChange={handleChange}
        />
        <label htmlFor="tankPressureStart">Tank Pressure Start:</label>
        <input
          type="number"
          name="tankPressureStart"
          value={tankPressureStart}
          onChange={handleChange}
        />
        <label htmlFor="tankPressureEnd">Tank Pressure End:</label>
        <input
          type="number"
          name="tankPressureEnd"
          value={tankPressureEnd}
          onChange={handleChange}
        />
        <label htmlFor="tankType">Tank Type:</label>
        <select name="tankType" onChange={handleChange} value={tankType}>
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
        <label htmlFor="beltWeight">Belt Weight:</label>
        <input
          type="number"
          name="beltWeight"
          value={beltWeight}
          onChange={handleChange}
        />
        <label htmlFor="wetSuitType">Wet Suit Type:</label>
        <select name="wetSuitType" onChange={handleChange} value={wetSuitType}>
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
        <label htmlFor="wetSuitThickness">Wet Suit Thickness:</label>
        <input
          type="number"
          name="wetSuitThickness"
          value={wetSuitThickness}
          onChange={handleChange}
        />
        <label htmlFor="airMixture">Air Mixture:</label>
        <select name="airMixture" onChange={handleChange} value={airMixture}>
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
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Enter description here..."
        />
        <label htmlFor="visibility">Visibility:</label>
        <input
          type="number"
          name="visibility"
          value={visibility}
          onChange={handleChange}
        />
        <label htmlFor="hasStrongCurrent">Strong Current?</label>
        <select
          name="hasStrongCurrent"
          onChange={handleChange}
          value={hasStrongCurrent}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <ObservationSearch
        enterObservation={enterObservation}
        keyup={keyup}
        handleChange={handleChange}
        currentList={currentList}
        diverObservations={diverObservations}
        removeFromList={removeFromList}
      />
    </div>
  )
}

export default UpdateForm
