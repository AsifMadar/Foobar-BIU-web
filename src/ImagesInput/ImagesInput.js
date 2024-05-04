import { createRef, useEffect, useState } from 'react'
import addImageIcon from '../img/add-image-icon.svg'

/**
 * @param {object} props
 * @param {string[]} props.initialImages
 * @param {number} props.maxImagesNum
 * @param {(newImages: string[]) => void} props.onUpdate
 */
function ImagesInput({ initialImages, maxImagesNum, onUpdate }) {
    const [images, setImages] = useState(initialImages)
    const fileInputRef = createRef()

    function deleteImage(i) {
        const imagesCopy = structuredClone(images)
        imagesCopy.splice(i, 1)
        setImages(imagesCopy)
        onUpdate(imagesCopy)
    }

    function addImage(e) {
        const fileList = e.target.files
        if (fileList.length !== 1) return

        const img = fileList.item(0)
        const reader = new FileReader()

        reader.readAsDataURL(img)
        reader.onload = () => {
            const imagesCopy = structuredClone(images)
            imagesCopy.push(reader.result)
            setImages(imagesCopy)
            onUpdate(imagesCopy)
        }
    }

    useEffect(() => {
        setImages(initialImages)
    }, [initialImages])

    return (
        <div className="d-flex flex-column align-items-center">
            {images.length < maxImagesNum && (
                <button
                    className="add-image btn icon-link border mb-2"
                    onClick={() => fileInputRef.current.click()}>
                    <img src={addImageIcon} alt="" />
                    Add an image...
                    <input
                        className="d-none"
                        type="file"
                        ref={fileInputRef}
                        onChange={addImage}
                        accept="image/*"
                    />
                </button>
            )}
            {images.map((imageSrc, i) => (
                <div key={i} className="image-container m-1">
                    <button
                        className="btn btn-close delete-img"
                        onClick={() => deleteImage(i)}
                    />
                    <img src={imageSrc} className="img-fluid" alt="" />
                </div>
            ))}
        </div>
    )
}

export default ImagesInput
