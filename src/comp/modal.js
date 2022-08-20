
import React from 'react'
function closeModal() {
    document.getElementById('myModal').style.opacity=0
}
export default function Modal(){
    return(
        <>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

<div id="myModal" style={{opacity:1,position:'absolute',top:100,zIndex:100,paddingLeft:'5%'}}>

            <div className="modal-header">
            <a href="https://study.purpletutor.com/enroll.html?source=IITK" target="_blank" >
            <img src='./topbanner.jpeg' style={{width:'100%'}}></img>

            </a>
                <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>&times;</button>

    </div>
</div>
</>
);
}