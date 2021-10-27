import classes from './Card.module.css';
import doc1 from '../../assets/doc1.jpg'

const Card = () => {
  return <div className={classes.card}>
   
<img className={classes.doc1} src={doc1} alt='dermat' />
<div className={classes.docName}>Dr. Ashwini M sheety</div>
<br/><br/>
<div className={classes.exp}>9 yrs exp| M.S |MD</div>
  </div>
};

export default Card;