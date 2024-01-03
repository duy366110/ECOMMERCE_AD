import useHttp from '../../../hook/use-http';
import config from "../../../configs/config.env";
import classes from "./Common-Catalogy-Image-Component.module.css";

const CommonCatalogyImageComponent = (props) => {
    const { httpMethod } = useHttp();

    // PHƯƠNG THỨC THỰC HIỆN XOÁ ẢNH
    const onDeleteImageHandler = async (event) => {
        if(window.confirm("Are you sure delete image")) {
            let image = event.target.src;
            httpMethod({
                url: `${config.URI}/api/admin/${props.endpoint}/photo`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({id: props.id, photo: image}),
                customForm: false
            },
            (infor) => {

                let { status } = infor;
                if(status) {
                   window.location.reload();
                }
            })
        }
    }
    
    return (
        <div className={classes['common-catalogy-image-component']}>
            {props.thumbnails.map((photo, index) => {
                return (
                    <img
                        onClick={onDeleteImageHandler}
                        key={index}
                        src={photo} alt="Thumbnail" />
                )
            })}
        </div>
    )
}

export default CommonCatalogyImageComponent;