import React from 'react'

const CertForm = ({
  handleSubmit,
  handleChange,
  certId,
  displayTextOrg,
  displayTextLevel,
  provider,
  date,
  instructorId,
  singleCert,
  level
}) => {
  const providerOptions = ['NAUI', 'PADI', 'SSI', 'Other']
  const levelOptions = [
    'Open Water',
    'Advancded Open Water',
    'Rescue Diver',
    'Deep Diver',
    'Other'
  ]
  return (
    //   <form className="InputForm" onSubmit={handleSubmit}>
    //     <label htmlFor="certId">Certification ID: </label>
    //     <input type="text" name="certId" value={certId} onChange={handleChange} />

    //     <label htmlFor="provider">Provider: </label>

    //     {!displayTextOrg ? (
    //       <select name="provider" onChange={handleChange}>
    //         {providerOptions.map(
    //           opt =>
    //             opt === singleCert.provider ? (
    //               <option key={opt} value={opt} selected>
    //                 {opt}
    //               </option>
    //             ) : (
    //               <option key={opt} value={opt}>
    //                 {opt}
    //               </option>
    //             )
    //         )}
    //       </select>
    //     ) : (
    //       <input
    //         type="text"
    //         name="provider"
    //         value={provider}
    //         onChange={handleChange}
    //       />
    //     )}

    //     <label htmlFor="date">Date Obtained: </label>
    //     <input type="date" name="date" value={date} onChange={handleChange} />

    //     <label htmlFor="level">Level: </label>
    //     {!displayTextLevel ? (
    //       <select name="level" onChange={handleChange}>
    //         {levelOptions.map(
    //           opt =>
    //             opt === singleCert.level ? (
    //               <option key={opt} value={opt} selected>
    //                 {opt}
    //               </option>
    //             ) : (
    //               <option key={opt} value={opt}>
    //                 {opt}
    //               </option>
    //             )
    //         )}
    //       </select>
    //     ) : (
    //       <input type="text" name="level" value={level} onChange={handleChange} />
    //     )}

    //     <label htmlFor="instructorId">Instructor ID: </label>
    //     <input
    //       type="text"
    //       name="instructorId"
    //       value={instructorId}
    //       onChange={handleChange}
    //     />

    //     <button type="submit">Submit</button>
    //   </form>
    // )
    <div className="page-container ChartContainer">
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Description</th>
              <th>Value</th>
            </tr>

            <tr>
              <td>
                {' '}
                <label htmlFor="certId">Certification ID: </label>
              </td>
              <td>
                <input
                  type="text"
                  name="certId"
                  value={certId}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="provider">Provider: </label>
              </td>
              <td>
                {!displayTextOrg ? (
                  <select name="provider" onChange={handleChange}>
                    {providerOptions.map(
                      opt =>
                        opt === singleCert.provider ? (
                          <option key={opt} value={opt} selected>
                            {opt}
                          </option>
                        ) : (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        )
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="provider"
                    value={provider}
                    onChange={handleChange}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <label htmlFor="date">Date Obtained: </label>
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
                <label htmlFor="level">Level: </label>
              </td>
              <td>
                {!displayTextLevel ? (
                  <select name="level" onChange={handleChange}>
                    {levelOptions.map(
                      opt =>
                        opt === singleCert.level ? (
                          <option key={opt} value={opt} selected>
                            {opt}
                          </option>
                        ) : (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        )
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="level"
                    value={level}
                    onChange={handleChange}
                  />
                )}
              </td>
            </tr>

            <tr>
              <td>
                {' '}
                <label htmlFor="instructorId">Instructor ID: </label>
              </td>
              <td>
                {' '}
                <input
                  type="text"
                  name="instructorId"
                  value={instructorId}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="btn-main btn-form btn-cert">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CertForm
