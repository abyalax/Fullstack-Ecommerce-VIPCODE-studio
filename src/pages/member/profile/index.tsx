import ProfileMemberView from "@/components/views/member/Profile"
import userServices from "@/services/user"
import { User } from "@/types/user.type"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type PropTypes = {
    setToaster: Dispatch<SetStateAction<{}>>
}

const ProfilePage = ({ setToaster }: PropTypes) => {
    return <ProfileMemberView setToaster={setToaster} />
}
export default ProfilePage

