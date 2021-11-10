import classes from "./Footer.module.css";
import medIcon from "../../assets/medicon.jpg";
const Footer = () => {
  return (
    <div>
      <header className={classes.footer}>
        <div className="container">
          <br />
          <div className="row">
            <div className="col">
              <img src={medIcon} width="50" height="50" alt="" />
              <span style={{ marginLeft: "23px" }}>
                At MEDFIT, we make daily food healthy & tasty, mental fitness
                easy with yoga and medical & lifestyle care hassle-free.
                #BeBetterEveryDay
              </span>
            </div>
          </div>
          <br />
        </div>
      </header>
    </div>
  );
};

export default Footer;
