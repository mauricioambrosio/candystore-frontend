import React from "react";

const ImageArea = ({ name, label, uriList, deletedImages, onChangeCallback }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label} </label>
        <div className="card">
          <div className="container-fluid">
            {uriList.map(uri => {
                let border_color = "";
                if (deletedImages.includes(uri)) border_color = "border-danger";
                else border_color = "border-primary";

                return <img 
                key = {uri}
                className = {"card-img-top m-2 border-5 " + border_color}
                role="button"
                src={uri} 
                alt=""
                style={{resizeMode:"contain",  width:100}}
                onClick={()=>{
                  if(deletedImages.includes(uri)) deletedImages = deletedImages.filter(item=>item!==uri)
                  else deletedImages.push(uri)
                  onChangeCallback(deletedImages);
                }}
                />
              }
            )}
          </div>
        </div>
      </div>
    );
};

export default ImageArea;