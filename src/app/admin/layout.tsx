import { ReactNode } from "react"
import Sidebar from "../components/Sidebar"

const AdminLayout = ({children}:{children : ReactNode}) => {
  return (
    <div>
      <Sidebar/>
      {children}
    </div>
  )
}

export default AdminLayout


