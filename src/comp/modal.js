
import React from 'react'
function closeModal() {
    document.getElementById('myModal').remove()
}
export default function Modal(){
    return(
        <>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

<div id="myModal" style={{opacity:5,position:'absolute',top:250,zIndex:100, margin: 'auto'}}>

            <div className="modal-header">
            <a href="https://study.purpletutor.com/enroll.html?source=IITK" target="_blank" >
            <img src='./topbanner.jpeg' style={{width:'100%'}} />

            </a>
                <button style={{fontSize: '2rem', color: 'green' , padding: '0'}} type="button" className="close" data-dismiss="modal" onClick={closeModal}>&times;</button>

    </div>
</div>
</>
);
}