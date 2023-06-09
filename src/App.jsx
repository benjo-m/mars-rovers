import { useState } from "react"
import Form from "./components/Form"
import styles from "./styles/App.module.css"
import Gallery from "./components/Gallery"
import RoverDetails from "./components/RoverDetails"

const API_KEY = import.meta.env.VITE_API_KEY

export default function App() {
  const [selectedRover, setSelectedRover] = useState({})
  const [selectedCamera, setSelectedCamera] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [photos, setPhotos] = useState(null)
  const [detailsFlag, setDetailsFlag] = useState(false)
  const [photosFlag, setPhotosFlag] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  function getRover(e) {
    let roverName = e.target.value
    console.log(roverName)
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/?&api_key=${API_KEY}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSelectedRover(data.rover))
  }

  function getPhotos(page) {
    let url =
      selectedCamera == ""
        ? `https://api.nasa.gov/mars-photos/api/v1/rovers/${
            selectedRover.name
          }/photos?earth_date=${
            selectedDate == "" ? selectedRover.landing_date : selectedDate
          }&page=${page}&api_key=${API_KEY}`
        : `https://api.nasa.gov/mars-photos/api/v1/rovers/${
            selectedRover.name
          }/photos?earth_date=${
            selectedDate == "" ? selectedRover.landing_date : selectedDate
          }&camera=${selectedCamera}&page=${page}&api_key=${API_KEY}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data)
      })

    setPhotosFlag(true)
    setDetailsFlag(false)
  }

  function getCamera(e) {
    let cam = e.target.value
    setSelectedCamera(cam)
  }

  function getDate(e) {
    let date = e.target.value
    setSelectedDate(date)
  }

  function viewDetails() {
    setDetailsFlag(true)
    setPhotosFlag(false)
  }

  function nextPage() {
    setCurrentPage((prev) => prev + 1)
    getPhotos(currentPage + 1)
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      getPhotos(currentPage - 1)
    }
  }

  return (
    <div>
      <Form
        getRover={getRover}
        getCamera={getCamera}
        getDate={getDate}
        viewPhotos={() => getPhotos(1)}
        viewDetails={viewDetails}
        cameras={selectedRover.cameras}
        buttonsDisabled={selectedRover.cameras == null ? true : false}
      />
      {!detailsFlag && !photosFlag ? (
        <div className={styles.infoDiv}>
          <h1>Start by selecting a rover</h1>
          <p>
            You if you leave date field as empty, you will see all the photos
            that selected rover has taken on the first day of its mission{" "}
          </p>
        </div>
      ) : detailsFlag ? (
        <RoverDetails rover={selectedRover} />
      ) : (
        photos && (
          <Gallery
            phs={photos}
            rover={selectedRover}
            date={selectedDate}
            nextPage={nextPage}
            prevPage={prevPage}
            disablePrev={currentPage == 1}
          />
        )
      )}
    </div>
  )
}
