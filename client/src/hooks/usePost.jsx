import { useState } from "react"

const usePost = () => {

    const [postModal, setPostModal] = useState(false)

    return { postModal, setPostModal }
}

export default usePost