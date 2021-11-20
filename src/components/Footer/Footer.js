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
                At MEDFIT, we care about mental fitness and try to provide
                online consultation with the best doctors in the industry
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
