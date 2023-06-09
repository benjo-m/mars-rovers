import styles from "../styles/RoverDetails.module.css"

function RoverDetails({ rover }) {
  let cams = []
  console.log(rover)
  if (rover !== undefined) {
    cams = rover.cameras.map((cam) => <li key={cam.name}>{cam.full_name}</li>)
  }

  return (
    <div className={styles.container}>
      <img
        src={`public/${rover.name}.png`}
        alt="rover-image"
        className={styles.roverImage}
      />
      <section className={styles.roverInfo}>
        <p className={styles.infoTitle}>
          <strong>Name: </strong> {rover.name}
        </p>
        <p className={styles.infoTitle}>
          <strong>Launch date: </strong>
          {rover.launch_date}
        </p>
        <p className={styles.infoTitle}>
          <strong>Landing date: </strong>
          {rover.landing_date}
        </p>
        <p className={styles.infoTitle}>
          <strong>Mission Status: </strong>
          {rover.status}
        </p>
        <p className={styles.infoTitle}>
          <strong>Last picture taken on: </strong>
          {rover.max_date}
        </p>
        <p className={styles.infoTitle}>
          <strong>Total photos taken: </strong>
          {rover.total_photos}
        </p>
        <p className={styles.infoTitle}>
          <strong>Cameras:</strong> {cams}
        </p>
      </section>
    </div>
  )
}

export default RoverDetails
