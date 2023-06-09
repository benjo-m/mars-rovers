import styles from "../styles/Gallery.module.css"

export default function Gallery({
  phs,
  date,
  rover,
  nextPage,
  prevPage,
  disablePrev,
}) {
  console.log(phs)
  let p = phs.photos.map((ph) => (
    <img key={ph.id} src={ph.img_src} className={styles.photo} />
  ))

  return (
    <>
      {p.length > 0 && (
        <div className={styles.btnDiv}>
          <button
            className={styles.buttons}
            onClick={prevPage}
            disabled={disablePrev}
          >
            Previous page
          </button>
          <button
            className={styles.buttons}
            onClick={nextPage}
            disabled={p.length < 25}
          >
            Next page
          </button>
        </div>
      )}
      <div className={styles.container}>
        {p.length == 0 ? (
          <div className={styles.message}>
            {rover.name} did not take any photos on{" "}
            {date == "" ? rover.landing_date : date} with selected camera
          </div>
        ) : (
          p
        )}
      </div>
      {p.length > 0 && (
        <div className={styles.btnDiv}>
          <button
            className={styles.buttons}
            onClick={prevPage}
            disabled={disablePrev}
          >
            Previous page
          </button>
          <button
            className={styles.buttons}
            onClick={nextPage}
            disabled={p.length < 25}
          >
            Next page
          </button>
        </div>
      )}
    </>
  )
}
