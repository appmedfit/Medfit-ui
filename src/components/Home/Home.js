import { Fragment } from 'react';
import Dermat from '../../assets/Dermat.jpg'
import Physician from '../../assets/physician.jpg'
import ENT from '../../assets/ENT.jpg'
import Ortho from '../../assets/Ortho.jpg'
import Paediatric from '../../assets/Paediatric.jpg'
import Ophthal from '../../assets/Opthal.jpg'
import Sexologist from '../../assets/Sexologist.jpg'
import Urology from '../../assets/Urology.jpg'
import Physio from '../../assets/Physio.jpg'
import Dental from '../../assets/Dental.jpg'
import classes from './Home.module.css'
import history from '../history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const Home = () => {
  const SpecialtyData=[
    {'name':'Dermat',imgSrc:Dermat,link:''},
    {'name':'Physician',imgSrc:Physician,link:''},
    {'name':'ENT',imgSrc:ENT,link:''},
    {'name':'Ortho',imgSrc:Ortho,link:''},
    {'name':'Paediatric',imgSrc:Paediatric,link:''},
    {'name':'Sexologist',imgSrc:Sexologist,link:''},
    {'name':'Urology',imgSrc:Urology,link:''},
    {'name':'Physio',imgSrc:Physio,link:''},
    {'name':'Dental',imgSrc:Dental,link:''},
    {'name':'Ophthal',imgSrc:Ophthal,link:''}
    
  ]
  return (
    <Fragment>
      <Router>
        <div className="card">
        <div className="card-body">
            <p className={classes.spl}>Specialists</p>
            <p className={classes.subtitle}>Consult with top Doctors</p>
            {/* <div className={classes.Specialty}>
              
                <Link to='/Specialty'>
                <img className={classes.Dermat} src={Dermat} alt='dermat' />
                </Link>
              
                    <img className={classes.Physician} src={Physician} alt='dermat' />
                    <img className={classes.ENT} src={ENT} alt='ENT' />
                    <img className={classes.Ortho} src={Ortho} alt='ENT' />
                    <img className={classes.Paediatric} src={Paediatric} alt='Paediatric' />

                  </div>
                  <div className={classes.Specialty1}>
                    <img className={classes.Ophthal} src={Ophthal} alt='dermat' />
                    <img className={classes.Urology} src={Urology} alt='dermat' />
                    <img className={classes.Ophthal} src={Ophthal} alt='ENT' />
                    <img className={classes.Sexologist} src={Sexologist} alt='ENT' />
                    <img className={classes.Urology} src={Urology} alt='Paediatric' />

                  </div> */}
 <div className="container">
    <div className="row ">
      {
        SpecialtyData.map((spl,index)=>
          
            <div className={classes.col} key={index} onClick={()=>{history.push('/specialty')}}>
              
                <div className="card" style={{width: "11rem"}}>
                <img className="card-img-top" src={spl.imgSrc} alt={spl.name}/>
        
                </div>
           
            </div>
        )
      }
    </div>
    
  </div>            
                 
  </div>
 </div>

      </Router>
    </Fragment>
  );
};

export default Home;
