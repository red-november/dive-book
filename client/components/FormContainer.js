import React from 'react'

const Form = props => {
  const {handleChange, handleSubmit} = props
  const {
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
    visibility
  } = props.log
  return (
    <div>
      <h2>New Log: </h2>
      <form onSubmit={handleSubmit}>
        <label id="form" htmlFor="diveName">
          Dive Name:
        </label>
        <input
          type="text"
          name="diveName"
          value={diveName}
          onChange={handleChange}
          placeholder="Enter dive here..."
        />
        <label id="form" htmlFor="timeIn">
          Time In:
        </label>
        <input
          type="datetime-local"
          name="timeIn"
          value={timeIn}
          onChange={handleChange}
        />
        <label id="form" htmlFor="timeOut">
          Time Out:
        </label>
        <input
          type="datetime-local"
          name="timeOut"
          value={timeOut}
          onChange={handleChange}
        />
        <label id="form" htmlFor="location">
          Location:
        </label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="Enter location here..."
        />
        <label id="form" htmlFor="maxDepth">
          Max Depth:
        </label>
        <input
          type="number"
          name="maxDepth"
          value={maxDepth}
          onChange={handleChange}
        />
        <label id="form" htmlFor="tankPressureStart">
          Tank Pressure Start:
        </label>
        <input
          type="number"
          name="tankPressureStart"
          value={tankPressureStart}
          onChange={handleChange}
        />
        <label id="form" htmlFor="tankPressureEnd">
          Tank Pressure End:
        </label>
        <input
          type="number"
          name="tankPressureEnd"
          value={tankPressureEnd}
          onChange={handleChange}
        />
        <label id="form" htmlFor="tankType">
          Tank Type:
        </label>
        <input
          type="text"
          name="tankType"
          value={tankType}
          onChange={handleChange}
          placeholder="Enter type here..."
        />
        <label id="form" htmlFor="beltWeight">
          Belt Weight:
        </label>
        <input
          type="number"
          name="beltWeight"
          value={beltWeight}
          onChange={handleChange}
        />
        <label id="form" htmlFor="wetSuitType">
          Wet Suit Type:
        </label>
        <input
          type="text"
          name="wetSuitType"
          value={wetSuitType}
          onChange={handleChange}
          placeholder="Enter type here..."
        />
        <label id="form" htmlFor="wetSuitThickness">
          Wet Suit Thickness:
        </label>
        <input
          type="number"
          name="wetSuitThickness"
          value={wetSuitThickness}
          onChange={handleChange}
        />
        <label id="form" htmlFor="airMixture">
          Air Mixture:
        </label>
        <input
          type="text"
          name="airMixture"
          value={airMixture}
          onChange={handleChange}
          placeholder="Enter misture here..."
        />
        <label id="form" htmlFor="description">
          Description:
        </label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Enter description here..."
        />
        <label id="form" htmlFor="visibility">
          Visibility:
        </label>
        <input
          type="number"
          name="visibility"
          value={visibility}
          onChange={handleChange}
        />
        <label id="form" htmlFor="hasStrongCurrent">
          Strong Current?
        </label>
        <select>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button id="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
