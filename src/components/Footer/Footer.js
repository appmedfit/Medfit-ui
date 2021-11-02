import classes from "./Footer.module.css";
import medIcon from "../../assets/medicon.jpg";
const Footer = () => {
  return (
    <div>
      <header className={classes.footer}>
        <div className="container">
          <img
            src={medIcon}
            width="50"
            height="50"
            style={{ marginTop: "20px" }}
            alt=""
          />
          <div className="row">
            <div className="col">
              <br />
              At MEDFIT, we make daily food healthy & tasty, mental fitness easy
              with yoga and medical & lifestyle care hassle-free.
              #BeBetterEveryDay
            </div>
            <div className="col">
              <ul>
                <li> CONTACT US</li>
                <li>BLOG</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Footer;
