import React, { useState } from 'react'
import NavDrawer from '../Navdrawer'
import ListofConsultation from '../Admin/Consultations/ListofConsultation'
import PostConsultation from '../Admin/Consultations/PostConsultation'

const menuItems = [
  { showText: 'Dashboard', connectedLink: 'allConsultants' },
  { showText: 'My Consultations', connectedLink: 'allConsultants' },
  { showText: 'All Consultations', connectedLink: 'allConsultants' },
  { showText: 'Notifications', connectedLink: 'allConsultants' },
]

export default function Consultant() {
  const [listOfConsultation, setListOfConsultation] = useState(true)
  const [addNewConsultation, setNewConsultation] = useState(false)

  const handleDrawer = (data) => {
    if (data === 'allConsultants') {
      setListOfConsultation(true)
      setNewConsultation(false)
    } else {
      setNewConsultation(true)
      setListOfConsultation(false)
    }
  }

  return (
    <>
      <NavDrawer drawerItems={menuItems} handleDrawer={handleDrawer} />
      {listOfConsultation && <ListofConsultation />}
      {addNewConsultation && <PostConsultation />}
    </>
  )
}
