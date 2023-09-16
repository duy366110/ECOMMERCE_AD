import React from 'react';
import { useNavigate } from "react-router-dom";
import useHttp from '../../../hook/use-http';
import classes from "./Common-Catalogy-Image-Component.module.css";

const CommonCatalogyImageComponent = (props) => {
    const navigate = useNavigate();

    const { httpMethod } = useHttp();

    // PHƯƠNG THỨC THỰC HIỆN XOÁ ẢNH
    const deleteImage = async (event) => {
        if(window.confirm("Are you sure delete image")) {
            let { img } = event.target.dataset;
            httpMethod({
                url: `http://localhost:5000/api/admin/${props.endpoint}/photo`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({id: props.id, photo: img}),
                customForm: false
            },
            (infor) => {

                let { status, message } = infor;
                if(status) {
                    navigate(`/${props.endpoint}s`);
                }
            })
        }
    }
    
    return (
        <div className={classes['common-catalogy-image-component']}>
            {props.images.map((photo) => {
                return (
                    <img onClick={deleteImage} data-img={photo} src={`http://localhost:5000/${photo}`} alt="Thumbnail" />
                )
            })}
        </div>
    )
}

export default CommonCatalogyImageComponent;