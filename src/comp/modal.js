
import React from 'react'
function closeModal() {
    document.getElementById('myModal').remove();
}
export default function Section0(){
    return(
        <>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

<div id="myModal" style={{opacity:1}}>

            {/* <div className="modal-header"> */}
            {/* <div style={{ display: 'flex', alignItems: 'center'}}> */}
            <button type="button" className="close" data-dismiss="modal" onClick={closeModal} >&times;</button>
            <a href="https://study.purpletutor.com/enroll.html?source=IITK" target="_blank" >
            <img src='./topbanner.jpeg' style={{height:"10%", width:"100%", objectFit:'fill'}} ></img>

            </a>
            
            {/* </div> */}

    </div>
{/* </div> */}
</>
);
}