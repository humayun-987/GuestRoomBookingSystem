    
import React, {useEffect} from 'react'
function closeModal() {
    document.getElementById('myModal').remove();
    document.body.style.overflow = "scroll";
    document.getElementById('navbar').style.opacity = 1;
    document.getElementById('sponsor_front').style.opacity = 1;

}
export default function Modal(){
    useEffect(() => {
        document.getElementById('navbar').style.opacity = .2;
        document.getElementById('sponsor_front').style.opacity = .2;

        document.body.style.overflow = "scroll";
      }, []);
    return(
        <>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

<div id="myModal" style={{opacity:1,position:'absolute',top:100,zIndex:100,paddingLeft:'5%'}}>

            <div className="modal-header">
            <a href="https://www.youtube.com/channel/UCWA2to9SqSEWHOU7MmiTPCw" target="_blank">
            <img src='./topbanner.jpeg' style={{width:'100%'}} alt="Banner"></img>

            </a>
                <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>&times;</button>

    </div>
</div>
</>
);
}