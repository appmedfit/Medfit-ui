import classes from './Specialty.css'
import Dermat1 from '../../assets/Dermat1.jpg'
import Card from './../UI/Card'
import { useHistory,useParams } from "react-router";
import docName1 from '../../assets/docName.jpg'
import { useEffect } from 'react';

const Specialty = () => {
   let { specialityId } = useParams();

    const SpecialtyData=[
    {'name':'Dermatology','type':'Dermatology Consultation',imgSrc:Dermat1,link:'', 'about': 'Dermatologist specializes in issues related to Skin and Hair. They treat conditions, disorders and inflammatory symptoms of any age and gender. Common problems like Acne, Pigmentation, Hair Fall, Loose Skin, Excess Hair, Warts are treated.'},
    {'name':'Physician','type':'General Physician Consultation',imgSrc:docName1,link:'','about':'Sample','Dr.Name1':'Sanjeev Prasad','exp1':'10 yrs','degree1':'MBBS, MD','location':'xyz clinic'},
     
  ] 
  let data={}

  useEffect(() => {
     data= SpecialtyData.filter((row)=>{
       console.log(specialityId)  
      return row.name== specialityId
    })
    console.log(data)
    data=data.length>0? data[0]:{}
  }, [specialityId])

 
  return (
     
          <div className="row">
            <div className="col Dermat1">
            <img className={classes.Dermat1} src={Dermat1} alt='dermat' />
            </div>
            <div className="h1">
            <h1>{data.type}</h1>
            </div>
        
            {/* <h2>{specialityId}</h2> */}
            <p className="col p2">About</p>
            <div className="col">
            <p className="p1"> {data.about}</p>
          
        </div>
        <div className="col card1">
        <Card/>       
      <br/>
      <Card/>
        </div>
        </div>
  );
};

export default Specialty;
