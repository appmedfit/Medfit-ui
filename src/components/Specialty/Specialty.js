import classes from './Specialty.module.css'
import Dermat1 from '../../assets/Dermat1.jpg'
import Card from './../UI/Card'
import doc1 from '../../assets/doc1.jpg'


const Specialty = () => {
  return (
        <div>
          <div className={classes.first}>
            <img className={classes.Dermat1} src={Dermat1} alt='dermat' />
            <h1  className={classes.h1}>Dermatology Consultation</h1>
            <div><br/></div>
            
            <p className={classes.p2}>About</p>
        <p className={classes.p1}>

        Dermatologist specializes in issues related to Skin and Hair. <br/>
        They treat conditions, disorders and inflammatory symptoms of any age and gender.<br/>
        Common problems like Acne, Pigmentation, Hair Fall, Loose Skin, Excess Hair, Warts are treated.</p>
          </div>

        <div className={classes.card1}>
        <Card>
        <div className={classes.docName}>Dr. Ashwini M sheety</div>
        <img className={classes.doc1} src={doc1} alt='dermat' />
        <div className={classes.exp}>9 yrs exp| M.S |MD</div>
        </Card>
        </div>
        </div> 
  );
};

export default Specialty;
