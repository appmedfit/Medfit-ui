import { Fragment, useEffect, useState, useRef } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../store/auth.slice";
import { useHistory } from "react-router";
import { getAllSpecialties } from "../../services/specialty.service";
const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setImgLoading] = useState(false);
  const [SpecialtyData, setspecialtyData] = useState([]);
  const imgCounter = useRef(0);
  const imageLoaded = () => {
    imgCounter.current += 1;
    if (imgCounter.current >= SpecialtyData?.length) {
      console.log("load comp d");
      dispatch(setLoading(false));
      setImgLoading(false);
    }
  };
  useEffect(() => {
    setImgLoading(true);
    dispatch(setLoading(true));
    if (sessionStorage.getItem("specialities")) {
      setspecialtyData(JSON.parse(sessionStorage.getItem("specialities")));
    } else {
      fetchSpecialities();
    }
  }, []);

  const fetchSpecialities = () => {
    getAllSpecialties()
      .then((resp) => {
        sessionStorage.setItem("specialities", JSON.stringify(resp));
        setspecialtyData(resp);
      })
      .catch((err) => {
        setImgLoading(false);
        dispatch(setLoading(false));
      });
  };
  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <p className="spl">Specialists</p>
          <p className="subtitle">Consult with top Doctors</p>
          <div className="container">
            <div className="innerContainer">
              <div className="row ">
                {SpecialtyData &&
                  SpecialtyData.map((spl, index) => (
                    <div
                      className="col"
                      key={index}
                      onClick={() => {
                        history.push("/speciality/" + spl.name);
                      }}
                    >
                      <div
                        className="card"
                        style={{
                          width: "11rem",
                          cursor: "pointer",
                          border: "none",
                        }}
                      >
                        <img
                          className="card-img-top"
                          src={spl.thumbnail}
                          alt={spl.name}
                          onLoad={imageLoaded}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
