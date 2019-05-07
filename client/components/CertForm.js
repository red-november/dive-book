import React from 'react'

const CertForm = ({
  handleSubmit,
  handleChange,
  certId,
  displayText,
  provider,
  date,
  instructorId,
  singleCert
}) => {
  const providerOptions = ['NAUI', 'PADI', 'SSI', 'Other']
  const levelOptions = [
    'Open Water',
    'Advancded Open Water',
    'Rescue Diver',
    'Deep Diver'
  ]
  return (
    <form className="InputForm" onSubmit={handleSubmit}>
      <label htmlFor="certId">Certification ID: </label>
      <input type="text" name="certId" value={certId} onChange={handleChange} />

      <label htmlFor="provider">Provider: </label>

      {!displayText ? (
        <select name="provider" onChange={handleChange}>
          {providerOptions.map(
            opt =>
              opt === singleCert.provider ? (
                <option value={opt} selected>
                  {opt}
                </option>
              ) : (
                <option value={opt}>{opt}</option>
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

      <label htmlFor="date">Date Obtained: </label>
      <input type="date" name="date" value={date} onChange={handleChange} />

      <label htmlFor="level">Level: </label>
      <select name="level" onChange={handleChange}>
        {levelOptions.map(
          opt =>
            opt === singleCert.level ? (
              <option value={opt} selected>
                {opt}
              </option>
            ) : (
              <option value={opt}>{opt}</option>
            )
        )}
      </select>
      <label htmlFor="instructorId">Instructor ID: </label>
      <input
        type="text"
        name="instructorId"
        value={instructorId}
        onChange={handleChange}
      />

      <button type="submit">Update Certification</button>
    </form>
  )
}

export default CertForm
