import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
      <div>
          <p className = 'f2'>
           {'Insert your image link below and click Detect to detect your face'}   
          </p>
            <div className = 'center'>
                <div className = 'form center br3 pa4 shadow-5'>
                    <input className = 'f4 pa2 bg-light-blue w-70 center' type ='text' onChange = {onInputChange} />
                    <button className = 'bg-green f4 link dib ph3 pv2 grow w-30 shadow-5' onClick = {onButtonSubmit}>Detect</button>
                </div>
            </div>
      </div>
    )
} 

export default ImageLinkForm;