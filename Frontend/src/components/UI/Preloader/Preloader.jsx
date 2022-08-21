
import { ReactComponent as PreloaderSVG } from './../../../assert/image/preloader.svg'

export const Preloader = () => {
    return (
        <div className='preloader-container'>
            <PreloaderSVG className='preloader_image'/>
        </div>
    )
}