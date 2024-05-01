import { useState } from 'react'
import AdvancedTextField from '../TextField/AdvancedTextField.js'
import ImagesInput from '../ImagesInput/ImagesInput.js'
import instance, { jwt } from '../utils/axios.js'

/** @typedef {import('../data/posts.json').User} User */

/**
 * @param {object} props
 * @param {User} props.user
 * @param {(newUserDetails: User) => void} props.updatedUser
 */
const ManageUser = ({ user, updateUser }) => {
    const [profileImage, setImg] = useState(null)
    const [displayName, setDisplayName] = useState('')
    const [imagesInputInitial] = useState([])

    const isDisplayNameValid = name =>
        /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/.test(name) &&
        2 <= name.length &&
        name.length <= 16

    const updateImg = ([image]) => {
        setImg(image ?? null)
    }

    function editUser() {
        const patchObject = {}
        if (profileImage) patchObject.profileImage = profileImage
        if (isDisplayNameValid(displayName)) {
            patchObject.displayName = displayName
        }

        if (Object.keys(patchObject).length === 0) {
            return alert('No profile image, or display name is invalid!')
        }

        instance.patch(`/users/${user.username}`, patchObject).then(() => {
            updateUser(Object.assign({}, user, patchObject))
        })
    }

    function deleteUser() {
        if (
            prompt(
                'Are you sure you want to delete your user? Enter "yes" to confirm',
            )?.toLowerCase() === 'yes'
        ) {
            instance.delete(`/users/${user.username}`)

            jwt.set(null)
            updateUser(prevUser => ({
                ...prevUser,
                isSignedIn: false,
            }))
        } else {
            console.log('Delete cancelled')
        }
    }

    return (
        <div className="manage-user container d-flex flex-column align-items-center mt-4">
            <h5>Profile Image</h5>
            <ImagesInput
                maxImagesNum={1}
                onUpdate={updateImg}
                initialImages={imagesInputInitial}
            />
            <AdvancedTextField
                label="Display name"
                onInputChange={setDisplayName}
                funcValid={isDisplayNameValid}
                inValidationErrorMessage="Invalid display name"
                instruction="2-16 alphanumeric characters"
            />

            <button className="btn btn-primary mt-3" onClick={editUser}>
                Update user details
            </button>
            <button className="btn btn-danger mt-3" onClick={deleteUser}>
                Delete this user
            </button>
        </div>
    )
}

export default ManageUser
