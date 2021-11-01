import classes from './Card.module.css';
import docName from '../../assets/docName.jpg'
import login from '../../assets/login.png'
import Button from './Button'

const Card = () => {
  return <div className={classes.card}>

  <div className="row"> 
  
<img className={classes.doc1} src={docName} alt='dermat' />
<div className="col">
<div className={classes.docName}><b>Dr. Ashwini M sheety</b></div>
<br/>
<div className={classes.exp} style={{color:"grey"}}>9 yrs exp| M.S |MD</div>
<br/>
<div className="col row">
<img  style={{height:'20px',width:'20px'}} src={login} alt='login' />  
<div >XYZ clinic</div>
</div>
<br/>
<div className="button">
<Button>View Profile</Button>

<Button>Book Appointment</Button>
</div>
</div>
</div>
  </div>
};

export default Card;