import "./Specialty.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import doc from "../../assets/DocIcon.jpg";
import SlotBooking from "../SlotBooking/patientSlotBooking";
import { getUsersWithCondition } from "../../services/auth.service";
import { getSpeciality } from "../../services/specialty.service";
import { setLoading } from "../../store/auth.slice";
import { getDoctorSlots } from "../../services/slots.service";

const Specialty = () => {
  let { specialityId } = useParams();
  const dispatch = useDispatch();

  const [specialtyData, setspecialtyData] = useState({});
  const [doctorsdata, setDoctorsdata] = useState([]);
  const [toggleSlotBooking, setToggleSlotBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [doctorsSearchdata, setdoctorsSearchdata] = useState([]);

  const [lazyData, setLazyData] = useState([]);
  const [recCount, setRecCount] = useState(+3);
  const searchDoctors = (searchTerm) => {
    let doctorSearchdata = doctorsdata.filter((doctor) => {
      if (searchTerm == "undefined" || searchTerm == null || searchTerm == "") {
        return true;
      } else {
        let { name, consultancyFee, location, degree, specialty, experience } =
          doctor;
        return JSON.stringify({
          name,
          consultancyFee,
          location,
          degree,
          specialty,
          experience,
        })
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
    });
    setdoctorsSearchdata(doctorSearchdata);
    setLazyData(doctorSearchdata.slice(0, 3));
  };

  const handlBookingModalShowHide = () => {
    setToggleSlotBooking((i) => !i);
  };

  const handleCLickBookSlot = (doctor) => {
    // console.log(doctor);
    setSelectedDoctor(doctor);
    setToggleSlotBooking((i) => !i);
  };

  const handleLoadMore = () => {
    let data = doctorsSearchdata;
    setLazyData(data.slice(0, recCount + 3));
    setRecCount((count) => count + 3);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    if (specialityId) {
      getSpeciality(specialityId)
        .then((resp) => {
          setspecialtyData(resp);
        })
        .catch((err) => {});
      dispatch(
        getUsersWithCondition({ specialty: specialityId, role: "doctor" })
      ).then((resp) => {
        setDoctorsdata(resp);
      });
    }
  }, [specialityId]);

  useEffect(() => {
    if (doctorsdata && doctorsdata.length > 0 && specialityId) {
      searchDoctors();
    }
  }, [doctorsdata]);

  return (
    <>
      <div className="container">
        <div className="inner_container">
          {specialtyData ? (
            <div className="row">
              <div className="col">
                <div className="imgcard">
                  {specialtyData?.mainImage && (
                    <img
                      className="spl_img"
                      src={specialtyData.mainImage}
                      alt="spl_img"
                      onLoad={() => {
                        dispatch(setLoading(false));
                      }}
                      onError={() => {
                        dispatch(setLoading(false));
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="col">
                <h1 className="nameType">{specialtyData.type}</h1>

                <p>About</p>
                <p className="about_text"> {specialtyData.about}</p>

                <div className="doctors_container">
                  <div className="doctors_search">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="#000"
                          fillRule="evenodd"
                          d="M6.732 12.229c-3.146 0-5.696-2.506-5.696-5.602 0-3.096 2.55-5.607 5.696-5.607s5.696 2.511 5.696 5.607-2.55 5.602-5.696 5.602zm9.116 2.9l-4.13-4.066a6.526 6.526 0 0 0 1.745-4.436C13.463 2.966 10.45 0 6.732 0S0 2.966 0 6.627c0 3.656 3.014 6.622 6.732 6.622 1.606 0 3.08-.555 4.237-1.48l4.147 4.081c.202.2.53.2.732 0a.503.503 0 0 0 0-.72z"
                          opacity=".4"
                        />
                      </svg>
                    </span>
                    <div
                      id="care_doctor_search_input"
                      className="care-search-input-container "
                    >
                      <input
                        placeholder="search by "
                        type="text"
                        onChange={(e) => searchDoctors(e.target.value)}
                      />
                    </div>
                  </div>

                  {doctorsSearchdata && doctorsSearchdata.length > 0 ? (
                    <div className="doctors_inner_container">
                      <div className="row">
                        {doctorsSearchdata && (
                          <>
                            {lazyData &&
                              lazyData.map((doctor) => (
                                <div className="col-sm-12" key={doctor.id}>
                                  <div className="card doc-card">
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-sm-4">
                                          <img
                                            className="doc_profile_image"
                                            src={doc}
                                            alt="spl_img"
                                          />
                                        </div>
                                        <div className="col-sm-8">
                                          <h5 className="card-title">
                                            {"Dr."} {doctor.name}{" "}
                                            <span className="fee">
                                              {" "}
                                              ₹ {doctor.consultancyFee}{" "}
                                            </span>
                                          </h5>
                                          <p className="card-text">
                                            {doctor.experience} |{" "}
                                            {doctor.degree}
                                          </p>
                                          <p className="card-text">
                                            <span>
                                              <svg
                                                width="12px"
                                                height="18px"
                                                viewBox="0 0 12 18"
                                                version="1.1"
                                              >
                                                <g
                                                  id="Assets"
                                                  stroke="black"
                                                  strokeWidth="1"
                                                  fill="none"
                                                  fillRule="evenodd"
                                                  transform="translate(-352.000000, -1707.000000)"
                                                >
                                                  <g
                                                    id="Location"
                                                    transform="translate(343.000000, 1701.000000)"
                                                  >
                                                    <rect
                                                      id="Rectangle-13"
                                                      x="0"
                                                      y="0"
                                                      width="30"
                                                      height="30"
                                                    ></rect>
                                                    <g
                                                      id="location-copy"
                                                      transform="translate(9.000000, 6.000000)"
                                                    >
                                                      <g id="thin-0535_navigation_location_drop_pin_map">
                                                        <g id="Group">
                                                          <path
                                                            d="M5.80881319,16.0576267 C5.89739601,15.920012 5.98905078,15.7767237 6.0834142,15.6282044 C6.75815568,14.5662232 7.43284776,13.4558008 8.06173321,12.3529305 C8.39793411,11.7633382 8.71223224,11.1909832 9.00058047,10.6409138 C10.1885002,8.37477117 10.8676966,6.60820266 10.8676966,5.67282259 C10.8676966,2.95804699 8.60673105,0.75 5.80888773,0.75 C3.01102631,0.75 0.75,2.9580649 0.75,5.67282259 C0.75,6.60820473 1.42918739,8.37477379 2.61709161,10.6409175 C2.90543595,11.1909869 3.21972983,11.763342 3.55592619,12.3529343 C4.18480313,13.4558046 4.85948607,14.5662271 5.53421841,15.6282083 C5.62857967,15.7767262 5.72023235,15.9200131 5.80881319,16.0576267 Z"
                                                            id="Shape"
                                                            stroke="black"
                                                            strokeWidth="1.5"
                                                          ></path>
                                                          <circle
                                                            id="Oval"
                                                            fill="black"
                                                            cx="6"
                                                            cy="6"
                                                            r="2"
                                                          ></circle>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>
                                            </span>
                                            {doctor.location}
                                          </p>
                                          {/* <p className="card-text">
                                              <span>
                                                <svg
                                                  width="13px"
                                                  height="15px"
                                                  viewBox="0 0 10 11"
                                                  version="1.1"
                                                >
                                                  <g
                                                    id="Doctor-Sub-Speciality"
                                                    stroke="none"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    fillRule="evenodd"
                                                  >
                                                    <g
                                                      id="Speciality-page_experiment-5.1-Copy-5"
                                                      transform="translate(-34.000000, -1031.000000)"
                                                      fillRule="nonzero"
                                                    >
                                                      <g
                                                        id="Group-4"
                                                        transform="translate(34.000000, 1031.000000)"
                                                      >
                                                        <path
                                                          d="M2.5,1.9 C1.6163444,1.9 0.9,2.6163444 0.9,3.5 L0.9,8.5 C0.9,9.3836556 1.6163444,10.1 2.5,10.1 L7.5,10.1 C8.3836556,10.1 9.1,9.3836556 9.1,8.5 L9.1,3.5 C9.1,2.6163444 8.3836556,1.9 7.5,1.9 L2.5,1.9 Z M2.5,0 L2.5,1 L2.5,1 L4.5,0.999 L4.5,0 L5.5,0 L5.5,0.999 L7.5,1 L7.5,0 L8.5,0 L8.50083003,1.20838468 C9.38333908,1.59435237 10,2.47516175 10,3.5 L10,8.5 C10,9.88071187 8.88071187,11 7.5,11 L2.5,11 C1.11928813,11 0,9.88071187 0,8.5 L0,3.5 C0,2.47477282 0.617129067,1.59368385 1.50017484,1.20794546 L1.5,0 L2.5,0 Z"
                                                          id="Combined-Shape-Copy-61"
                                                          fill="#262626"
                                                        ></path>
                                                        <rect
                                                          id="Combined-Shape-Copy-62"
                                                          fill="#000000"
                                                          x="6"
                                                          y="4"
                                                          width="1"
                                                          height="1"
                                                          rx="0.5"
                                                        ></rect>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </svg>
                                              </span>
                                              Next Available Slot {doctor.nextSlot}
                                            </p> */}
                                          <button
                                            className="btn  bookSlot-btn"
                                            onClick={() =>
                                              handleCLickBookSlot(doctor)
                                            }
                                          >
                                            Book Appointment
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {lazyData &&
                              doctorsSearchdata &&
                              lazyData.length < doctorsSearchdata.length && (
                                <div
                                  className="load_more"
                                  onClick={() => handleLoadMore(recCount)}
                                >
                                  <span>Load more..</span>
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="norecords">
                      <div className="col">
                        <br />

                        <h2> Doctors Not Available</h2>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="col card1">
        <Card/>       
      <br/>
      <Card/>
        </div>  */}
              <SlotBooking
                handlBookingModalShowHide={handlBookingModalShowHide}
                toggleSlotBooking={toggleSlotBooking}
                doctor={selectedDoctor}
              />
            </div>
          ) : (
            <div className="norecords">
              <div className="col">
                <br />

                <h2> No Available Doctors</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Specialty;
