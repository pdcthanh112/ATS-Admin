import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const EmployeePage = React.lazy(() => import('./views/Employee/EmployeePage/EmployeePage'))
const DepartmentPage = React.lazy(() => import('./views/Department/DepartmentPage/DepartmentPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/employee', name: 'Employee Page', element: EmployeePage },
  { path: '/department', name: 'Department Page', element: DepartmentPage },
]

export default routes
