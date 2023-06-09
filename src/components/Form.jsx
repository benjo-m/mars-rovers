import styles from "../styles/Form.module.css"

function Form({
  getRover,
  getCamera,
  getDate,
  cameras,
  viewDetails,
  viewPhotos,
  buttonsDisabled,
}) {
  let cams = []

  if (cameras) {
    cams = cameras.map((cam) => (
      <option key={cam.name} value={cam.name}>
        {cam.full_name}
      </option>
    ))
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <label htmlFor="rover">Rover</label>
        <br />
        <select
          name="rover"
          id="rover"
          className={styles.cameraPicker}
          onChange={getRover}
        >
          <option value="" disabled selected>
            Select rover
          </option>
          <option className={styles.opt} value="curiosity">
            Curiosity
          </option>
          <option value="opportunity">Opportunity</option>
          <option value="perseverance">Perseverance</option>
          <option value="spirit">Spirit</option>
        </select>
      </div>
      <div className={styles.inputField}>
        <label htmlFor="camera">Camera</label>
        <br />
        <select
          name="camera"
          id="camera"
          className={styles.cameraPicker}
          onChange={getCamera}
        >
          <option value="">Any</option>
          {cams}
        </select>
      </div>
      <div className={styles.inputField}>
        <label htmlFor="date">Date</label>
        <br />
        <input
          type="date"
          name="date"
          id="date"
          className={styles.datePicker}
          onChange={getDate}
        />
      </div>
      <button
        className={styles.getBtn}
        disabled={buttonsDisabled}
        onClick={viewPhotos}
      >
        Get Images
      </button>
      <button
        className={styles.getBtn}
        onClick={viewDetails}
        disabled={buttonsDisabled}
      >
        Rover Details
      </button>
    </div>
  )
}

export default Form
