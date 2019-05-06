import React from 'react'

const Form = props => {
  const {handleChange, handleSubmit, shops} = props
  const {
    date,
    diveShopId,
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
    hasStrongCurrent
  } = props.log
  return (
    <div>
      <h2>New Log: </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="diveShop">Dive Shop:</label>
        <select name="diveshopId" onChange={handleChange}>
          <option value={null}>Select dive shop</option>
          {shops.map((shop, idx) => {
            return (
              <option key={shop.id} value={shop.id}>
                {shop.id}. {shop.name}
              </option>
            )
          })}
        </select>
        <label htmlFor="diveName">Dive Name:</label>
        <input
          type="text"
          name="diveName"
          value={diveName}
          onChange={handleChange}
          placeholder="Enter dive here..."
        />
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
        <select name="tankType" onChange={handleChange}>
          <option value="aluminum">Aluminum</option>
          <option value="steel">Steel</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="beltWeight">Belt Weight:</label>
        <input
          type="number"
          name="beltWeight"
          value={beltWeight}
          onChange={handleChange}
        />
        <label htmlFor="wetSuitType">Wet Suit Type:</label>
        <select name="wetSuitType" onChange={handleChange}>
          <option value="none">None</option>
          <option value="shortie">Shortie</option>
          <option value="fulljohn">Fulljohn</option>
          <option value="dry suit">Dry suit</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="wetSuitThickness">Wet Suit Thickness:</label>
        <input
          type="number"
          name="wetSuitThickness"
          value={wetSuitThickness}
          onChange={handleChange}
        />
        <label htmlFor="airMixture">Air Mixture:</label>
        <select name="airMixture" onChange={handleChange}>
          <option value="air">Air</option>
          <option value="nitrox">Nitrox</option>
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
        <select name="hasStrongCurrent" onChange={handleChange}>
          <option value={false}>False</option>
          <option value={true}>True</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form
