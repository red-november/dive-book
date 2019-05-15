import React from 'react'
import Chip from './styling/chip'

const SingleLogTable = ({
  singleShop,
  diveName,
  timeIn,
  timeOut,
  location,
  maxDepth,
  tankPressureEnd,
  tankPressureStart,
  tankType,
  beltWeight,
  wetSuitThickness,
  wetSuitType,
  airMixture,
  visibility,
  hasStrongCurrent,
  isVerified,
  date,
  singleLog,
  description,
  id,
  observations
}) => {
  return (
    <table className="log-table">
      <tr>
        <th>Description</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>ID: </td>
        <td>{id}</td>
      </tr>
      <tr>
        {/* <td><a href={`/allshops/${}`}></a> </td> */}
        <td>Dive Shop:</td>
        <td>
          <a href={`/allshops/${singleShop.id}`}> {singleShop.name}</a>
        </td>
      </tr>
      <tr>
        <td>Dive Name:</td>
        <td>
          <a href={`/alloffereddives/${singleLog.offeredDiveId}`}>{diveName}</a>
        </td>
      </tr>
      <tr>
        <td>Date: </td>
        <td>{date.slice(0, 10)}</td>
      </tr>
      <tr>
        <td>Time In:</td>
        <td>{timeIn}</td>
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
        <td>Max Depth (meters): </td>
        <td>{maxDepth}</td>
      </tr>
      <tr>
        <td>Tank Pressure Start (BAR): </td>
        <td>{tankPressureStart}</td>
      </tr>
      <tr>
        <td>Tank Pressure End (BAR): </td>
        <td>{tankPressureEnd}</td>
      </tr>
      <tr>
        <td>Tank Type</td>
        <td>{tankType}</td>
      </tr>
      <tr>
        <td>Belt Weight (kgs):</td>
        <td>{beltWeight}</td>
      </tr>
      <tr>
        <td>Wet Suit Type: </td>
        <td>{wetSuitType}</td>
      </tr>
      <tr>
        <td>Wet Suit Thickness (mm):</td>
        <td>{wetSuitThickness}</td>
      </tr>
      <tr>
        <td>Air Mixture: </td>
        <td>{airMixture}</td>
      </tr>
      <tr>
        <td>Visibility (meters): </td>
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
        <td>
          {isVerified ? (
            <img className="Stamp" src={singleShop.stampImgUrl} />
          ) : (
            'Not Verified'
          )}
        </td>
      </tr>
      <tr>
        <td>Observations:</td>
        <td>
          {' '}
          <Chip arr={observations} handleDelete={null} />
        </td>
      </tr>
    </table>
  )
}

export default SingleLogTable
